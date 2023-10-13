const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require('cors');
const multer = require('multer');
const accountQueries = require("./database/queries/accountQueries");
const pool = require("./database/db");
const { sendEmail } = require("./controllers/helperFunctions");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use("/api", router);

var saveToDatabase;
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const { user_id } = req.body;
    cb(null, user_id + path.extname(file.originalname));
    saveToDatabase = user_id + path.extname(file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, 
  },
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}\n`);
});

app.post("/update_profile_picture", upload.single('file'), async (req, res) => {
  console.log("[Info] Received request to update profile picture");
  const { username } = req.body
  
  if (!username) {
    return res.status(400).json({ error: "Missing username field" });
  }

  let pathInDB = "uploads/" + saveToDatabase;
  const db_res = await accountQueries.updateProfilePicQuery(pathInDB, username);
  if (!db_res) {
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.status(200).json({ message: "Successfully updated profile picture" });
});

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

// TODO WHEN logging in check if account is banned
// TODO WHEN viewing accounts check if account is deleted
// TODO Revoke API

printAllAccounts();

module.exports = {
  upload,
  storage,
  multer,
  saveToDatabase,
}