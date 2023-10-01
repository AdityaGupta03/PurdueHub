const pool = require("../db");

async function addEmailVerificationQuery(email, authCode) {
  const query = "INSERT INTO email_verification (email, authCode) VALUES ($1, $2)";
  const data = [email, authCode];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAuthCodeQuery(email) {
  const query = "SELECT authCode FROM email_verification WHERE email = $1";
  const data = [ email ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0].authCode;
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function removeEmailVerificationQuery(email) {
  const query = "DELETE FROM email_verification WHERE email = $1";
  const data = [ email ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  addEmailVerificationQuery,
  getAuthCodeQuery,
  removeEmailVerificationQuery
};