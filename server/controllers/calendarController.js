const calendarQueries = require("../database/queries/calendarQueries");

async function getCalendar(req, res) {
    console.log("[Info] Getting calendar for user " + req.body.username);

    const username = req.body.username;
    if (!username) {
        console.error("[Error] Missing username");
        return res.status(400).json({ error: "Missing username" });
    }
    
    try {
        let rows;
        rows = await calendarQueries.getCalendarQuery(username);
        if (rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        let calendar = {
            user_id : rows[0].user_id,
            calendar_events : rows[0].calendar_events_arr,
        };

        let calendar_events_arr = rows[0].calendar_events_arr;

        rows = await calendarQueries.getAllCalendarEventsQuery(rows[0].subscribed_cals);
        for (const element of rows) {
            calendar_events_arr += element.calendar_events_arr;
        }

        rows = await calendarQueries.getCalendarEventsQuery(calendar_events_arr);
        calendar.calendar_events = rows;
        
        return res.status(200).json({ calendar: calendar });
    } catch (error) {
        console.error("[Error] " + error);
        return res.status(500).json({ error: "Internal server error" });
    }   
}

module.exports = {
    getCalendar,
};