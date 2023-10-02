const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ouremail', // To be setup - a Purduehub email address
    pass: 'password', // To be setup - a Purduehub email password
  },
});

async function sendEmail(reciever, subject, text) {
  const mailOptions = {
    from: 'ouremail',
    to: reciever,
    subject: subject,
    text: text,
  };

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