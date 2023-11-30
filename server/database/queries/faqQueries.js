const pool = require("../db");

async function getTop5Query() {
  const query = "SELECT question, answer FROM faq ORDER BY count DESC LIMIT 5";
  
  try {
    let db_res = await pool.query(query, []);
    return db_res.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAllFAQsQuery() {
  try {
    let db_res = await pool.query("SELECT * FROM faq", []);
    return db_res.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateCountQuery(faq_id, newCount) {
  let query = "UPDATE faq SET count = $1 WHERE id = $2";
  let data = [ newCount, faq_id ];

  try {
    let db_res = await pool.query(query, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addQuestionQuery(question) {
  let query = "INSERT INTO faq (question, count) VALUES ($1, 1)";
  let data = [ question ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getTop5Query,
  getAllFAQsQuery,
  updateCountQuery,
  addQuestionQuery,
};