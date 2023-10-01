const pool = require("./db")

async function createAccount(req, res) {
  try {

    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Missing username" })
    }

    if (!email) {
      return res.status(400).json({ error: "Missing email" })
    }

    if (!password) {
      return res.status(400).json({ error: "Missing password" })
    }

    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const data = [username, email, password];

    await pool.query(query, data);
    return res.status(201).json({ message: "Account successfully created" });

  } catch (err) {

    console.log(err.message);
    return res.status(500).json({ error: "Error creating account" });

  }
}

module.exports = {
  createAccount,
};