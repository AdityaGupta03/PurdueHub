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
    return db_res.rows[0].authcode;
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

async function addUsernameResetQuery(email, authCode) {
  const query = "INSERT INTO username_reset_verification (email, authcode) VALUES ($1, $2)";
  const data = [ email, authCode ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addPasswordResetQuery(email, authCode) {
  const query = "INSERT INTO password_reset_verification (email, authcode) VALUES ($1, $2)";
  const data = [ email, authCode ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getUsernameAuthCodeQuery(email) {
  const query = "SELECT authcode FROM username_reset_verification WHERE email = $1";
  const data = [ email ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0].authcode;
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function getPasswordAuthCodeQuery(email) {
  const query = "SELECT authcode FROM password_reset_verification WHERE email = $1";
  const data = [ email ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0].authcode;
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function removeUsernameVerificationQuery(email) {
  const query = "DELETE FROM username_reset_verification WHERE email = $1";
  const data = [ email ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function checkVerifiedEmail(email) {
  const query = "SELECT * FROM email_verification WHERE email = $1";
  const data = [ email ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows.length == 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  addEmailVerificationQuery,
  getAuthCodeQuery,
  removeEmailVerificationQuery,
  addUsernameResetQuery,
  getUsernameAuthCodeQuery,
  removeUsernameVerificationQuery,
  addPasswordResetQuery,
  getPasswordAuthCodeQuery,
  checkVerifiedEmail,
};