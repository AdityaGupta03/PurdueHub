const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require('cors');
const multer = require('multer');
const accountQueries = require("./database/queries/accountQueries");
const path = require('path');
const helperFuncs = require("./controllers/helperFunctions");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use("/api", router);

let saveToDatabase;
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

if (!process.env.TEST_ENV) {
  app.listen(port, () => {
    console.log(`Server has started on port ${port}\n`);
  });
}

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

helperFuncs.printAllAccounts();

module.exports = {
  upload,
  storage,
  multer,
  saveToDatabase,
  app,
}