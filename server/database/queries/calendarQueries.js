const pool = require("../db");

async function getCalendarQuery(username) {
    const query = "SELECT * FROM calendars WHERE user_id = (SELECT user_id FROM users WHERE username = $1)";
    const data = [username];

    try {
        const { rows } = await pool.query(query, data);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error("[Error] getCalendarQuery");
        throw error;
    }
}

async function getCalendarEventsQuery(calendar_events_arr) {
    const query = "SELECT * FROM calendar_events WHERE id = ANY($1)";
    const data = [ calendar_events_arr ];

    try {
        const { rows } = await pool.query(query, data);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error("[Error] getCalendarEventsQuery");
        throw error;
    }
}

async function getAllCalendarEventsQuery(subscribed_cals) {
    const query = "SELECT calendar_events_arr FROM calendars WHERE id = ANY($1)";
    const data = [ subscribed_cals ];

    try {
        const { rows } = await pool.query(query, data);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error("[Error] getAllCalendarEventsQuery");
        throw error;
    }
}

module.exports = {
    getCalendarQuery,
    getCalendarEventsQuery,
    getAllCalendarEventsQuery,
};