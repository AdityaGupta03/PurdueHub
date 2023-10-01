const pool = require("../database/db");
const { isUniqueUsername, createAccountQuery, updateUsernameQuery } = require("../queries/accountQueries");

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

    const db_res = createAccountQuery(username, email, password);
    if (!db_res) {
      return res.status(500).json({ error: "Internal server error" });
    } else {
      return res.status(201).json({ message: "Account successfully created" });
    }
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
    consolelog(err.message);
    return res.status(500).json({ error: "Error updating username" });
  }
}

module.exports = {
  createAccount,
  updateUsername,
};