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

async function updateCalendarEvent(req, res) {
    console.log("[Info] Updating calendar event for user " + req.body.username);
    
    const username = req.body.username;
    if (!username) {
        console.error("[Error] Missing username");
        return res.status(400).json({ error: "Missing username" });
    }

    const { start, end, title, description, location, organization_id, id } = req.body;
    if (!start || !end || !title || !description || !location || !organization_id || !id) {
        console.error("[Error] Missing fields");
        return res.status(400).json({ error: "Missing fields" });
    }

    const calendar_event = {
        id: id,
        start: start,
        end: end,
        title: title,
        description: description,
        location: location,
        organization_id: organization_id,
    };

    try {
        await calendarQueries.updateCalendarEventQuery(calendar_event);
        return res.status(200).json({ message: "Calendar event updated" });
    } catch (error) {
        console.error("[Error] " + error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteCalendarEvent(req, res) {
    console.log("[Info] Deleting calendar event for user " + req.body.username);

    const username = req.body.username;
    if (!username) {
        console.error("[Error] Missing username");
        return res.status(400).json({ error: "Missing username" });
    }

    const id = req.body.id;

    try {
        await calendarQueries.removeCalendarEventsArrQuery(username, id);
        permanentlyDeleteCalendarEvent(id);
        return res.status(200).json({ message: "Calendar event deleted" });
    } catch (error) {
        console.error("[Error] " + error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function permanentlyDeleteCalendarEvent(id) {
    console.log("[Info] Checking if calendar event " + id + " is still in use");

    try {
        let result = await calendarQueries.isCalendarEventInUseQuery(id);
        if (result === false) {
            console.log("[Info] Calendar event " + id + " is not in use, deleting permanently");
            await calendarQueries.deleteCalendarEventQuery(id);
        }
    } catch (error) {
        console.error("[Error] " + error);
    }
}

async function addCalendarEvent(req, res) {
    console.log("[Info] Adding calendar event for user " + req.body.username);

    const username = req.body.username;
    if (!username) {
        console.error("[Error] Missing username");
        return res.status(400).json({ error: "Missing username" });
    }

    const { start, end, title, description, location, organization_id } = req.body;
    if (!start || !end || !title || !description || !location || !organization_id) {
        console.error("[Error] Missing fields");
        return res.status(400).json({ error: "Missing fields" });
    }

    const calendar_event = {
        start: start,
        end: end,
        title: title,
        description: description,
        location: location,
        organization_id: organization_id,
    };

    try {
        await calendarQueries.addCalendarEventQuery(calendar_event);
        await calendarQueries.addCalendarEventsArrQuery(username, calendar_event.id);
        return res.status(200).json({ message: "Calendar event added" });
    } catch (error) {
        console.error("[Error] " + error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getCalendar,
    updateCalendarEvent,
    deleteCalendarEvent,
    addCalendarEvent,
};