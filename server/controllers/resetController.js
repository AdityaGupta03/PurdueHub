const nodemailer = require('nodemailer');
const { checkAccountFromEmailQuery } = require("../database/queries/accountQueries")

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ouremail', // To be setup - a Purduehub email address
    pass: 'password', // To be setup - a Purduehub email password
  },
});

async function resetUsername(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing email field" });
  }

  const acc_exists = await checkAccountFromEmailQuery(email);
  if (!acc_exists) {
    return res.status(404).json({ error: "No account found with email provided "});
  }

  const authCode = generateAuthCode;
  const text = `Your authentication code for your requested username reset is ${authCode}`
  const subject = "PurdueHub - Username Account Reset"

  try {
    const sendemail_status = await sendEmail(email, subject, text);
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

function generateAuthCode() {
  return String(Math.floor(Math.random * 1000000)).padStart(6, "0");
}

async function sendEmail(reciever, subject, text) {
  const mailOptions = {
    from: 'ouremail',
    to: reciever,
    subject: subject,
    text: text,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = {
  resetUsername,
};
