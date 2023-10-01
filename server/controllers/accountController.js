const { isUniqueUsername, createAccountQuery, updateUsernameQuery } = require("../database/queries/accountQueries");
const { sendEmail } = require("./resetController");
const { addEmailVerificationQuery, getAuthCodeQuery, removeEmailVerificationQuery } = require("../database/queries/verificationQueries");

async function createAccount(req, res) {
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

    const isUnique = isUniqueUsername(username);
    if (!isUnique) {
      return res.status(400).json({ error: "Not unique username" });
    }

    let db_res = await createAccountQuery(username, email, password);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const authCode = generateAuthCode();
    const email_status = await sendEmailVerification(email, authCode);
    if (!email_status) {
      return res.status(500).json({ error: "Error sending verfication to email" });
    }

    db_res = await addEmailVerificationQuery(email, authCode);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Error creating account" });
  }
}

async function updateUsername(req, res) {
  try {
    const { newUsername, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    if (!newUsername) {
      return res.status(400).json({ error: "Missing new username" });
    }

    const isUnique = isUniqueUsername(newUsername);
    if (!isUnique) {
      return res.status(400).json({ error: "Not unique username" });
    }

    const db_res = updateUsernameQuery(user_id, newUsername);
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
    } else if (actual_authCode !== authCode) {
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
  try {
    const text = `Your email verification code is ${authCode}`;
    const subject = "Purduehub - Email Verification";
    
    const email_status = await sendEmail(email, subject, text);
    return email_status;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

function generateAuthCode() {
  return String(Math.floor(Math.random * 1000000)).padStart(6, "0");
}

module.exports = {
  createAccount,
  updateUsername,
  verifyEmail,
};