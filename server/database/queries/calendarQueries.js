const pool = require("../db");

async function createCalendarQuery(user_id) {
  const query = "INSERT INTO calendars (user_id) VALUES ($1) RETURNING id";
  const data = [ user_id ];

  try {
    const { rows } = await pool.query(query, data);
    return rows[0].id;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return null;
  }
}

module.exports = {
    createCalendarQuery,
};