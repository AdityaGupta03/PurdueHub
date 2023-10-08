const accountQueries = require("../database/queries/accountQueries");
const helperFuncs = require("./helperFunctions");
const { addEmailVerificationQuery, getAuthCodeQuery, removeEmailVerificationQuery } = require("../database/queries/verificationQueries");

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

    let db_res = await accountQueries.createAccountQuery(username, email, password);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const authCode = helperFuncs.generateAuthCode();
    const email_status = await sendEmailVerification(email, authCode);
    if (!email_status) {
      return res.status(500).json({ error: "Error sending verfication to email" });
    }

    db_res = await addEmailVerificationQuery(email, authCode);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Account successfully created" });
  } catch (err) {
    console.error("[ERROR] " + err.message);
    return res.status(500).json({ error: "Error creating account" });
  }
}

async function updateUsername(req, res) {
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

    const db_res = await accountQueries.updateUsernameQuery(user_id, newUsername);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    } else {
      return res.status(201).json({ message: "Successfully updated username" });
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

    const actual_authCode = await getAuthCodeQuery(email);
    if (actual_authCode === "") {
      return res.status(500).json({ error: "Internal server error" });
    } else if (actual_authCode != authCode) {
      return res.status(400).json({ error: "Incorrect authentication code" });
    }

    const db_res = await removeEmailVerificationQuery(email);
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
    const subject = "Purduehub - Email Verification";
    
    const email_status = await helperFuncs.sendEmail(email, subject, text);
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
    if (unblocked_user_info === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const unblock_user_id = unblocked_user_info.user_id;

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
  const text = `Your authentication code for your requested username reset is ${authCode}`
  const subject = "PurdueHub - Username Account Reset"

  try {
    const sendemail_status = await helperFuncs.sendEmail(email, subject, text);
    if (sendemail_status) {
      return res.status(201).json({ message: "Successfully sent email" });
    } else {
      return res.status(500).json({ error: "Error sending email" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createAccount,
  updateUsername,
  verifyEmail,
  blockUser,
  unblockUser,
  resetUsername,
  sendEmailVerification,
};