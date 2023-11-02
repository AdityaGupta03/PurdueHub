const pool = require("../db");

async function submitFeedbackQuery(user_id, feedback_title, feedback_body) {

    const query = "INSERT INTO feedback (user_id, feedback_title, feedback_body) VALUES ($1, $2, $3)";
    const data = [ user_id, feedback_title, feedback_body ];

    try {
        await pool.query(query, data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}


module.exports = {
    submitFeedbackQuery,
};