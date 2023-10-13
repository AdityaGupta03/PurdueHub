const pool = require("../db");

async function addReportQuery(reported_username, reportee_username, reason) {
    const query = "INSERT INTO reports (reported_username, reporter_username, reason) VALUES ($1, $2, $3)";
    const data = [ reported_username, reportee_username, reason ];

    try {
        await pool.query(query, data);
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

async function deleteReportQuery(report_id) {
    const query = "DELETE FROM reports WHERE id = $1";
    const data = [ report_id ];

    try {
        await pool.query(query, data);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

module.exports = {
    addReportQuery,
    deleteReportQuery,
};