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

async function getCourseID(course_name) {
  try {
    const course_id = await pool.query("SELECT id FROM course WHERE name = $1 ORDER BY id DESC LIMIT 1;", [course_name]);
    return course_id.rows[0].id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getAllClasses,
  getCourseID
};