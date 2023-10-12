const pool = require("../db");

async function isUniqueUsernameQuery(username) {
  const query = "SELECT COUNT(*) FROM users WHERE username = $1";
  const data = [ username ];

  console.log(query);
  console.log(data);
  try {
    const db_res = await pool.query(query, data);
    const numFound = db_res.rows[0].count;
    console.log(numFound);
    
    return numFound == 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createAccountQuery(username, email, password) {
  const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id";
  const data = [username, email, password];

  try {
    let { rows } = await pool.query(query, data);
    return rows[0].user_id;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return null;
  }
}

async function updateUsernameQuery(email, newUsername) {
  const query = "UPDATE users SET username = $1 WHERE email = $2";
  const data = [newUsername, email];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function getUserInfoQuery(user_id) {
  const query = "SELECT username, profile_picture, bio FROM users WHERE user_id = $1";
  const data = [user_id];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0];
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function checkAccountFromEmailQuery(email) {
  const query = "SELECT * FROM users where email = $1";
  const data = [email];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows.length > 0;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function getUserInfoFromUsernameQuery(username) {
  const query = "SELECT * FROM users where username = $1";
  const data = [ username ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0];
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return null;
  }
}

async function blockUserQuery(block_user_id, user_id) {
  const query = "UPDATE users SET blocked = array_append(blocked, $1) WHERE user_id = $2";
  const data = [ block_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function blockUserQuery(block_user_id, user_id) {
  const query = "UPDATE users SET blocked = array_append(blocked, $1) WHERE user_id = $2";
  const data = [ block_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function unblockUserQuery(unblock_user_id, user_id) {
  const query = "UPDATE users SET blocked = array_remove(blocked, $1) WHERE user_id = $2";
  const data = [ block_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function followUserQuery(user_id, to_follow_user_id) {
  const query = "UPDATE users set follow = array_append(follow, $1) WHERE user_id = $2";
  const data = [ to_follow_user_id, user_id ];
  
  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addCalendarIdQuery(user_id, calendar_id) {
  const query = "UPDATE users SET calendar_id = $1 WHERE user_id = $2";
  const data = [ calendar_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log("[ERROR] " + error);
    return false;
  }
}


async function unfollowUserQuery(user_id, to_unfollow_user_id) {
  const query = "UPDATE users set follow = array_remove(follow, $1) WHERE user_id = $2";
  const data = [ to_unfollow_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function checkAccountFromUsernameQuery(username) {
  const query = "SELECT * FROM users where username = $1";
  const data = [ username ];

  try {
    const db_res = await pool.query(query, data);
    console.log("Username exists: " + db_res.rows.length > 0);
    return db_res.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getBlockListQuery(user_id) {
  const query = "SELECT username FROM users WHERE user_id = ANY(SELECT blocked FROM users WHERE user_id = $1)";
  const data = [ user_id ];

  try {
    const usernames = await pool.query(query, data);
    return usernames;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updatePasswordQuery(username, password) {
  const query = "UPDATE users SET password = $1 WHERE username = $2";
  const data = [ password, username ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function loginQuery(username, password) {
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const data = [ username, password ];

  try {
    const db_res = await pool.query(query, data);
    console.log("User to login: " + db_res.rows[0].user_id);
    return db_res.rows[0].user_id;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

async function deleteAccountQuery(user_id) {
  const query = "DELETE FROM users WHERE user_id = $1";
  const data = [ user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  isUniqueUsernameQuery,
  updateUsernameQuery,
  createAccountQuery,
  getUserInfoQuery,
  checkAccountFromEmailQuery,
  getUserInfoFromUsernameQuery,
  blockUserQuery,
  unblockUserQuery,
  followUserQuery,
  unfollowUserQuery
  addCalendarIdQuery,
  checkAccountFromUsernameQuery,
  getBlockListQuery,
  updatePasswordQuery,
  loginQuery,
  deleteAccountQuery,
};