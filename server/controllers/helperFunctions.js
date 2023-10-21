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

async function printAllAccounts() {
  console.log("Print all accounts");
  let query = 'SELECT * FROM users';
  
  try { 
    const res = await pool.query(query);
    let data;

    for (const account in res.rows) {
      console.log(res.rows[account]);
      if (res.rows[account].banned == 1 && res.rows[account].banemail == 0) {
        console.log("Send ban email");
        const subject = 'Your Purdue account has been banned';
        const msg = "Your account has been banned";
        const email = res.rows[account].email;
        await sendEmail(email, subject, msg);
        query = 'UPDATE users SET banEmail = 1 WHERE user_id = $1';
        data = [res.rows[account].user_id];
        await pool.query(query, data);
        console.log("Updated banEmail");
      }
      if (res.rows[account].markdeleted == 1 && res.rows[account].deleteemail == 0) {
        console.log("Send delete email");
        const subject = 'Your Purdue account has been deleted';
        const msg = "Your account has been deleted";
        const email = res.rows[account].email;
        await sendEmail(email, subject, msg);
        query = 'UPDATE users SET deleteEmail = 1 WHERE user_id = $1';
        data = [res.rows[account].user_id];
        await pool.query(query, data);
        console.log("Updated markDeleted");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  generateAuthCode,
  sendEmail,
  printAllAccounts,
};