async function resetPassword(req, res) {
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
    const text = `Your authentication code for your requested password reset is ${authCode}`
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

// to do: put query in query database
// UPDATE users SET password = $1 WHERE user_id = $2
  async function updatePassword(req, res) {
    console.log("[INFO] Update username api.");
    try {
      const { newPassword, user_id } = req.body;
  
      if (!user_id) {
        return res.status(400).json({ error: "Missing user_id" });
      }
  
      if (!newPassword) {
        return res.status(400).json({ error: "Missing new password" });
      }

  
      const db_res = await accountQueries.updatePasswordQuery(user_id, newPassword);
      if (!db_res) {
        return res.status(500).json({ error: "Internal server error" });
      } else {
        return res.status(201).json({ message: "Successfully updated password" });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Error updating password" });
    }
  }