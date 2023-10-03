const nodemailer = require('nodemailer');

// Our email address: purduehub.org@gmail.com
// Our email login password: purduehub-org-123
// Our email app password: hgmd wupu evbg htjf
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'purduehub.org@gmail.com', // To be setup - a Purduehub email address
    pass: 'hgmd wupu evbg htjf', // To be setup - a Purduehub email password
  },
});

async function sendEmail(reciever, subject, text) {
  const mailOptions = {
    from: 'purduehub.org@gmail.com',
    to: reciever,
    subject: subject,
    text: text,
  };
  console.log(mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

function generateAuthCode() {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

module.exports = {
  generateAuthCode,
  sendEmail,
};