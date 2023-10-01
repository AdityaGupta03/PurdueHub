const pool = require("./db");

async function isUniqueUsername(username) {
    const query = "SELECT COUNT(*) FROM users WHERE username = $1";
    const data = [ username ];

    const db_res = await pool.query(query, data);
    const numFound = db_res.rows[0].count;

    if (numFound === 0) {
        return true;
    } else {
        return false;
    }
}

async function createAccountQuery(username, email, password) {
    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const data = [ username, email, password ];

    try {
        const db_res = await pool.query(query, data);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateUsernameQuery(user_id, newUsername) {
    const query = "UPDATE users SET username = $1 WHERE user_id = $2";
    const data = [ newUsername, user_id ];

    try {
        const db_res = await pool.query(query, data);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function getUserInfo(user_id) {
    const query = "SELECT username, profile_picture, bio FROM users WHERE user_id = $1";
    const data = [ user_id ];

    try {
        const db_res = await pool.query(query, data);
        return db_res.rows[0];
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    isUniqueUsername,
    updateUsernameQuery,
    createAccountQuery,
    getUserInfo,
};