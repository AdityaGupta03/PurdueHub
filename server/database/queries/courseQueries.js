const pool = require("../db");

async function getAllClasses() {
  try {
    const classes = await pool.query("SELECT DISTINCT name FROM course");
    return classes.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getAllClasses
};