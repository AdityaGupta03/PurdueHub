const accountQueries = require("../database/queries/accountQueries");
const calendarQueries = require("../database/queries/calendarQueries");
const helperFuncs = require("./helperFunctions");
const verificationQueries = require("../database/queries/verificationQueries");
const reportQueries = require("../database/queries/reportQueries");
const { saveToDatabase } = require("../server");

async function createAccount(req, res) {
  console.log("[INFO] Creating account api.");
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Missing username" });
    }

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    const isUnique = await accountQueries.isUniqueUsernameQuery(username);
    if (!isUnique) {
      return res.status(400).json({ error: "Not unique username" });
    }
    console.log("Is a unique username: " + username);

    let db_res = await accountQueries.createAccountQuery(username, email, password);
    if (db_res == -1) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const user_id = db_res;

    let calendar_id = await calendarQueries.createCalendarQuery(user_id);
    if (calendar_id === null) {
      return res.status(500).json({ error: "Internal server error" });
    }

    db_res = await accountQueries.addCalendarIdQuery(user_id, calendar_id);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("Sending email verification.");

    const authCode = helperFuncs.generateAuthCode();
    const email_status = await sendEmailVerification(email, authCode);
    console.log("email_status: " + email_status);
    if (!email_status) {
      const delete_acc_status = deleteAccount(username);
      if (!delete_acc_status) {
        return res.status(500).json({ error: "Internal server error." });
      }
      return res.status(500).json({ error: "Error sending verfication to email. Deleted account." });
    }

    console.log("Sent email verification.");

    db_res = await verificationQueries.addEmailVerificationQuery(email, authCode);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Account successfully created", user_id: user_id });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Error creating account" });
  }
}

async function deleteAccount(username) {
  console.log("[INFO] Deleting account helper.")
  let account = await accountQueries.getUserInfoFromUsernameQuery(username);
  if (account == null) {
    return false;
  }

  const user_id = account.user_id;
  let db_res = await accountQueries.deleteAccountQuery(user_id);
  if (!db_res) {
    return false;
  }
  console.log("Deleted account: " + user_id);

  const calendar_id = account.calendar_id;
  db_res = await calendarQueries.deleteCalendarQuery(calendar_id);
  if (!db_res) {
    return false;
  }
  console.log("Deleted calendar: " + calendar_id);

  return true;
}

async function login(req, res) {
  console.log("[INFO] Login api.");
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  if (!password) {
    return res.status(400).json({ error: "Missing password" });
  }

  const acc_exists = await accountQueries.checkAccountFromUsernameQuery(username);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with username provided "});
  }

  const isBanned = await accountQueries.checkBannedQuery(username);
  if (isBanned) {
    return res.status(400).json({ error: "Account is banned" });
  }

  const isDelete = await accountQueries.checkDeleteQuery(username);
  if (isDelete) {
    return res.status(400).json({ error: "Account is deleted" });
  }

  const account = await accountQueries.getUserInfoFromUsernameQuery(username);
  if (account === null) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const email = account.email;
  const isVerified = await verificationQueries.checkVerifiedEmail(email);
  if (!isVerified) {
    return res.status(400).json({ error: "Email not yet verified. Check for email to your purdue email." });
  }

  const user_id = await accountQueries.loginQuery(username, password);
  if (user_id === -1) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  return res.status(200).json({ message: "Successfully logged in", user_id: user_id });
}

async function updateUsername(req, res) {
  console.log("[INFO] Update username api.");
  try {
    const { newUsername, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    if (!newUsername) {
      return res.status(400).json({ error: "Missing new username" });
    }

    const isUnique = await accountQueries.isUniqueUsernameQuery(newUsername);
    if (!isUnique) {
      return res.status(400).json({ error: "Not unique username" });
    }

    const db_res = await accountQueries.updateUsernameQuery(email, newUsername);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    } else {
      return res.status(200).json({ message: "Successfully updated username" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Error updating username" });
  }
}

async function updateUsernameFromID(req, res) {
  console.log("[INFO] Update username api.");
  try {
    const { newUsername, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    if (!newUsername) {
      return res.status(400).json({ error: "Missing new username" });
    }

    const isUnique = await accountQueries.isUniqueUsernameQuery(newUsername);
    if (!isUnique) {
      return res.status(400).json({ error: "Not unique username" });
    }

    const db_res = await accountQueries.updateUsernameFromIDQuery(user_id, newUsername);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    } else {
      return res.status(200).json({ message: "Successfully updated username" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Error updating username" });
  }
}

async function verifyEmail(req, res) {
  console.log("[INFO] Verify email api.");
  try {
    const { email, authCode } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    if (!authCode) {
      return res.status(400).json({ error: "Missing authCode" });
    }

    const actual_authCode = await verificationQueries.getAuthCodeQuery(email);
    if (actual_authCode === "") {
      return res.status(500).json({ error: "Internal server error" });
    } else if (actual_authCode != authCode) {
      return res.status(400).json({ error: "Incorrect authentication code" });
    }

    const db_res = await verificationQueries.removeEmailVerificationQuery(email);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "Successfully verified email" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Error verifying email" });
  }
}

async function sendEmailVerification(email, authCode) {
  console.log("[INFO] Send email verification helper.");
  try {
    const text = `Your email verification code is ${authCode}`;
    const link = `\n\nClick the link below to verify your email:\nhttp://localhost:3000/verify_email/${email}`;
    const msg = text + link;
    const subject = "Purduehub - Email Verification";
    
    const email_status = await helperFuncs.sendEmail(email, subject, msg);
    console.log("[INFO] Sent verification email.");
    return email_status;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function blockUser(req, res) {
  console.log("[INFO] Block user api.");
  const { user_id, block_username } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" }); 
  }

  if (!block_username) {
    return res.status(400).json({ error: "Missing blocked username" }); 
  }

  try {
    const blocked_user_info = await accountQueries.getUserInfoFromUsernameQuery(block_username);
    if (blocked_user_info === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const block_user_id = blocked_user_info.user_id;

    const db_res = await accountQueries.blockUserQuery(block_user_id, user_id);
    if (!db_res) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Successfully blocked user" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Error blocking user" });
  }
}

async function unblockUser(req, res) {
  console.log("[INFO] Unblock user api.");
  const { user_id, unblock_username } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" }); 
  }

  if (!unblock_username) {
    return res.status(400).json({ error: "Missing blocked username" }); 
  }

  try {
    const unblocked_user_info = await accountQueries.getUserInfoFromUsernameQuery(unblock_username);
    console.log(unblocked_user_info);
    if (unblocked_user_info === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const unblock_user_id = unblocked_user_info.user_id;
    console.log(unblock_user_id);

    const db_res = await accountQueries.unblockUserQuery(unblock_user_id, user_id);
    if (!db_res) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Successfully unblocked user" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Error unblocking user" });
  }
}

async function resetUsername(req, res) {
  console.log("[INFO] Reset username api.");
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing email field" });
  }

  const acc_exists = await accountQueries.checkAccountFromEmailQuery(email);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with email provided "});
  }

  const authCode = helperFuncs.generateAuthCode();
  const text = `Your authentication code for your requested username reset is ${authCode}`;
  const subject = "PurdueHub - Username Account Reset";

  try {
    const sendemail_status = await helperFuncs.sendEmail(email, subject, text);
    if (!sendemail_status) {
      return res.status(500).json({ error: "Error sending email" });
    }
    console.log("[INFO] Sent verification email.");

    const db_res = await verificationQueries.addUsernameResetQuery(email, authCode);
    if (!db_res) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Successfully sent email" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFollowedUsers(req, res) {
  console.log("[INFO] Get followed users api.");
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const acc_exists = await accountQueries.checkAccountFromUsernameQuery(username);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with username provided."});
  }

  try {
    const follow_ids = await accountQueries.getFollowedUsersQuery(username);
    console.log(follow_ids.rows[0].following);
    if (follow_ids.rows[0].following === null) {
      return res.status(200).json({ following: [] });
    }

    return res.status(200).json({ following: follow_ids.rows[0].following });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting follow list" });
  }
}

async function getFollowedBy(req, res) {
  console.log("[INFO] Get people who follow user api.");
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const acc_exists = await accountQueries.checkAccountFromUsernameQuery(username);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with username provided."});
  }

  const account_info = await accountQueries.getUserInfoFromUsernameQuery(username);
  if (account_info === null) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const user_id = account_info.user_id;

  try {
    console.log(user_id);
    const usernames = await accountQueries.getFollowedByUsersQuery(user_id);
    console.log(usernames.rows[0].followers);
    if (usernames.rows[0].followers === null) {
      return res.status(200).json({ followed_by: [] });
    }
    console.log(usernames);

    return res.status(200).json({ followed_by: usernames.rows[0].followers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting people who follow user" });
  }
}

async function followUser(req, res) {
  console.log("[INFO] Follow user api.");
  const { user_id, to_follow_username } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" }); 
  }
  if (!to_follow_username) {
    return res.status(400).json({ error: "Missing username to follow" });
  }

  try {
    const to_follow_user_info = await accountQueries.getUserInfoFromUsernameQuery(to_follow_username);
    if (to_follow_user_info === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const to_follow_user_id = to_follow_user_info.user_id;

    const db_res = await accountQueries.followUserQuery(user_id, to_follow_user_id);
    if (!db_res) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Successfully followed user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error following user" });
  }
}

async function unfollowUser(req, res) {
  console.log("[INFO] Unfollow user api.");
  const { user_id, to_unfollow_username } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }
  if (!to_unfollow_username) {
    return res.status(400).json({ error: "Missing username to unfollow" });
  }

  try {
    const to_unfollow_user_info = await accountQueries.getUserInfoFromUsernameQuery(to_unfollow_username);
    if (to_unfollow_user_info === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const to_unfollow_user_id = to_unfollow_user_info.user_id;
    
    const db_res = await accountQueries.unfollowUserQuery(user_id, to_unfollow_user_id);
    if (!db_res) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Successfully unfollowed user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error unfollowing user" });
  }
}

async function getBlockList(req, res) {
  console.log("[INFO] Get block list api.");
  const { username } = req.body;

  console.log("username: " + username);

  const acc_exists = await accountQueries.checkAccountFromUsernameQuery(username);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with username provided" });
  }

  try {
    const usernames = await accountQueries.getBlockListQuery(username);
    if (usernames === null) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(usernames.rows[0].blocked_username);
    if (usernames.rows[0].blocked_username == null) {
      return res.status(200).json({ blocked: [] });
    }
    return res.status(200).json({ blocked: usernames.rows[0].blocked_username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function verifyUsernameResetCode(req, res) {
  console.log("[INFO] Verify username reset code api.");
  const { email, authCode } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing email field" });
  }

  if (!authCode) {
    return res.status(400).json({ error: "Missing authCode field" });
  }

  const actual_authCode = await verificationQueries.getUsernameAuthCodeQuery(email);
  if (actual_authCode === "") {
    return res.status(500).json({ error: "Internal server error" });
  } else if (actual_authCode != authCode) {
    return res.status(400).json({ error: "Incorrect authentication code" });
  }

  const db_res = await verificationQueries.removeUsernameVerificationQuery(email);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully entered authentication code" });
}

async function resetPassword(req, res) {
  console.log("[INFO] Reset password api.");
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username field" });
  }

  const acc_exists = await accountQueries.checkAccountFromUsernameQuery(username);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with username provided "});
  }

  const user = await accountQueries.getUserInfoFromUsernameQuery(username);
  if (!user) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const email = user.email;

  const authCode = helperFuncs.generateAuthCode();
  const text = `Your authentication code for your requested password reset is ${authCode}`;
  const subject = "PurdueHub - Password Account Reset";

  try {
    const sendemail_status = await helperFuncs.sendEmail(email, subject, text);
    if (!sendemail_status) {
      return res.status(500).json({ error: "Error sending email" });
    }
    console.log("[INFO] Sent verification email.");

    const db_res = await verificationQueries.addPasswordResetQuery(email, authCode);
    if (!db_res) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Successfully sent email" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function verifyPasswordResetCode(req, res) {
  console.log("[INFO] Verify username reset code api.");
  const { username, authCode } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username field" });
  }

  const user = await accountQueries.getUserInfoFromUsernameQuery(username);
  if (!user) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const email = user.email;

  if (!authCode) {
    return res.status(400).json({ error: "Missing authCode field" });
  }

  const actual_authCode = await verificationQueries.getPasswordAuthCodeQuery(email);
  if (actual_authCode === "") {
    return res.status(500).json({ error: "Internal server error" });
  } else if (actual_authCode != authCode) {
    return res.status(400).json({ error: "Incorrect authentication code" });
  }

  const db_res = await verificationQueries.removeUsernameVerificationQuery(email);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully entered authentication code" });
}

async function updatePassword(req, res) {
  console.log("[INFO] Update password api.");
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username field" });
  }

  if (!password) {
    return res.status(400).json({ error: "Missing password field" });
  }

  const db_res = await accountQueries.updatePasswordQuery(username, password);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully updated password" });
}

async function getProfileData(req, res) {
  console.log("[INFO] Get profile data api.");
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username field" });
  }

  const user_info = await accountQueries.getUserInfoFromUsernameQuery(username);
  console.log(user_info);
  if (user_info == null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ message: "Got user info", user_info: user_info });
}

async function editProfileBio(req, res) {
  console.log("[INFO] Edit profile page bio.");
  try {
      const { bio, user_id } = req.body;
      const updateResult = await accountQueries.editBioQuery(bio, user_id);
      if (updateResult) {
          console.log("User Bio updated succesfully");
      } else {
          console.log("User bio updated failed!");
          return res.status(500).json({ error: "Error updating bio" });
      }

      return res.status(200).json({ message: "Successfully updated bio" });
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Error updating bio" });
  }
}

async function editProfilePicture(req, res) {
  const { username, file } = req.body
  console.log(req.body);
  
  if (!username) {
    return res.status(400).json({ error: "Missing username field" });
  }

  if (!file) {
    return res.status(400).json({ error: "Missing file " });
  }

  let pathInDB = "uploads/" + saveToDatabase;
  const db_res = await accountQueries.updateProfilePicQuery(pathInDB, username);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully updated profile picture" });
}

async function banAccount(req, res) {
  const { user_id, email } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id field" });
  }

  const subject = 'Your Purdue account has been banned';
  const msg = "Your account has been banned";
  await helperFuncs.sendEmail(email, subject, msg);

  const db_res = await accountQueries.banAccountQuery(user_id);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully banned account" });
}

async function markDeleteAccount(req, res) {
  const { user_id, email } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id field" });
  }

  const subject = 'Your Purdue account has been marked deleted';
  const msg = "Your account has been marked deleted";
  await helperFuncs.sendEmail(email, subject, msg);

  const db_res = await accountQueries.markDeleteAccountQuery(user_id);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully marked deleted account" });
}

async function revokeBan(req, res) {
  const { user_id, email } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id field" });
  }

  const subject = 'Your Purdue account ban/deletion has been revoked';
  const msg = "Your account ban/deletion has been revoked!";
  await helperFuncs.sendEmail(email, subject, msg);

  const db_res = await accountQueries.revokeBanQuery(user_id);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully revoked ban on account" });
}

async function reportUser(req, res) {
  const { reported, reportee, msg } = req.body;

  if (!reported) {
    return res.status(400).json({ error: "Missing reported field" });
  }

  if (!reportee) {
    return res.status(400).json({ error: "Missing reportee field" });
  }

  if (!msg || msg == "") {
    return res.status(400).json({ error: "Missing msg field" });
  }

  const account = await accountQueries.getUserInfoFromUsernameQuery(reported);
  if (account == null) {
    return res.status(404).json({ error: "User not found" });
  }

  const subject = 'Your Purdue account has been reported.';
  const em_msg = "Your account has been reported for the following reason: " + msg + "\n\nPlease contact the PurdueHub team for more information.";
  const email = account.email;
  await helperFuncs.sendEmail(email, subject, em_msg);

  const db_res = await reportQueries.addReportQuery(reported, reportee, msg);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully reported user" });
}

async function ignoreReport(req, res) {
  const { id, email } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing id field" });
  }

  if (!email) {
    return res.status(400).json({ error: "Missing email field" });
  }

  const subject = 'Your Purdue  report has been ignored.';
  const msg = "Your report has been ignored.";
  await helperFuncs.sendEmail(email, subject, msg);

  const db_res = await reportQueries.deleteReportQuery(id);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully ignored report" });
}

async function banFromReport(req, res) {
  const { id, ban_id, reported_email, reporter_email } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing id field" });
  }

  if (!ban_id) {
    return res.status(400).json({ error: "Missing ban_id field" });
  }

  if (!reported_email) {
    return res.status(400).json({ error: "Missing reported_email field" });
  }

  if (!reporter_email) {
    return res.status(400).json({ error: "Missing reporter_email field" });
  }

  let subject = 'Your Purdue report has been resulted in a ban!';
  let msg = "Your report has been resulted in a ban!";
  await helperFuncs.sendEmail(reporter_email, subject, msg);

  subject = "Your Purdue account has been banned from a previous report";
  msg = "Your account has been banned from a previous report";
  await helperFuncs.sendEmail(reported_email, subject, msg);

  let db_res = await reportQueries.deleteReportQuery(id);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  db_res = await accountQueries.banAccountQuery(ban_id);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully banned user" });
}

module.exports = {
  createAccount,
  updateUsername,
  verifyEmail,
  blockUser,
  unblockUser,
  resetUsername,
  getFollowedUsers,
  getFollowedBy,
  followUser,
  unfollowUser,
  getBlockList,
  verifyUsernameResetCode,
  resetPassword,
  verifyPasswordResetCode,
  updatePassword,
  login,
  getProfileData,
  updateUsernameFromID,
  editProfileBio,
  editProfilePicture,
  banAccount,
  markDeleteAccount,
  revokeBan,
  reportUser,
  ignoreReport,
  banFromReport,
  sendEmailVerification,
  deleteAccount,
};