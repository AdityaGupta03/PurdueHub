const helperFuncs = require("./helperFunctions");
const accountQueries = require("../database/queries/accountQueries");

async function messageUser(req, res) {
  console.log("[INFO] Direct message user API.");

  let { user_id, username, msg } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id field." });
  }

  if (!username) {
    return res.status(400).json({ error: "Missing username field." });
  }

  if (!msg) {
    return res.status(400).json({ error: "Missing message field." });
  }

  let sender = await accountQueries.getUserInfoQuery(user_id);
  if (!sender) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }

  let reciever = await accountQueries.getUserInfoFromUsernameQuery(username);
  if (reciever == null) {
    return res.status(404).json({ error: "User to send email to does not exist." });
  }

  console.log(sender);
  console.log(reciever);

  let isBlocked = await accountQueries.checkUserBlocked(user_id, reciever.user_id);
  if (isBlocked) {
    return res.status(400).json({ error: "Sender is blocked by user." });
  }

  let onlyFollowing = await accountQueries.isOnlyFollowing(reciever.user_id);
  if (onlyFollowing) {
    let isFollowing = await accountQueries.isFollowing(reciever.user_id, user_id);
    if (!isFollowing) {
      return res.status(400).json({ error: "User does not accept messages from everyone." });
    }
  }

  let subject = "PurdueHub - Direct Message from " + sender.username;
  let msg_status = await helperFuncs.sendEmail(reciever.email, subject, msg);
  if (!msg_status) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }

  return res.status(200).json({ message: "Successfully sent message." });
}

async function toggleDM(req, res) {
  console.log("[INFO] Toggle direct messaging option");

  let { user_id, option } = req.body;
  console.log(req.body);

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id field." });
  }

  if (!option) {
    return res.status(400).json({ error: "Missing option field." });
  }

  if (option != 0 && option != 1) {
    return res.status(400).json({ error: "Invalid option." });
  }

  console.log("User: " + user_id + " Option: " + option);

  let status = await accountQueries.toggleDM(user_id, option);
  if (!status) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }

  return res.status(200).json({ message: "Successfully updated option." });
}

module.exports = {
    messageUser,
    toggleDM,
};