const calendarQueries = require("../database/queries/calendarQueries");
const accountQueries = require("../database/queries/accountQueries");
const helperFuncs = require("./helperFunctions");

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
            return res.status(404).json({ error: "User not found" });
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
        console.log(rows);
        return res.status(200).json({ calendar: rows });
    } catch (error) {
        console.error("[Error] " + error);
        return res.status(500).json({ error: "Internal server error" });
    }   
}

async function updateCalendarEvent(req, res) {
    console.log("[Info] Updating calendar event for user " + req.body.username);

    console.log(req.body);
    
    const username = req.body.username;
    if (!username) {
        console.error("[Error] Missing username");
        return res.status(400).json({ error: "Missing username" });
    }

    const { start, end, title, description, location, organization_id, id } = req.body;
    if (!start || !end || !title || !organization_id || !id) {
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

    const calendarInfo = await calendarQueries.getCalendarInfoFromIdQuery(id);
    if (calendarInfo == null) {
        return res.status(500).json({ error: "Internal server error" });
    }

    const account = await accountQueries.getUserInfoFromUsernameQuery(username);
    if (!account) {
        return res.status(404).json({ error: "User not found" });
    }

    let title = "PurdueHub - Deleted Calendar Event";
    let msg = "Your calendar event, " + calendarInfo.title + ", has been deleted by " + username + ".\n\n";
    helperFuncs.sendEmail(account.email, title, msg);

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
    console.log(req.body);

    const username = req.body.username;
    if (!username) {
        console.error("[Error] Missing username");
        return res.status(400).json({ error: "Missing username" });
    }

    const { start, end, title, description, location, organization_id } = req.body;
    if (!start || !end || !title || !organization_id) {
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
        let calEvent_id = await calendarQueries.addCalendarEventQuery(calendar_event);
        await calendarQueries.addCalendarEventsArrQuery(username, calEvent_id);
        return res.status(200).json({ id: calEvent_id });
    } catch (error) {
        console.error("[Error] " + error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getClubEvents(req, res) {

    let db_res = await calendarQueries.getAllClubEventsQuery();
    if (db_res == null) {
        return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ events: db_res.rows });

}

async function getAllInterestedEvents(req, res) {
    let user_id = req.body.user_id;

    let db_res = await calendarQueries.getAllInterestedEvents(user_id);
    if (db_res == null) {
        return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ events: db_res.rows });
}

async function addIntrestedEvent(req, res) {
    const { user_id } = req.body;
    const { event_id } = req.body;
    // check if event already in user's intrested list
    let tmp = await checkEvent(user_id, event_id);
    if (tmp) {
        console.log("This event was is already in the list")
        return res.status(200).json({ message: "This event was is already in the list" });
    }
    let db_res = await calendarQueries.addIntrestedEventQuery(user_id, event_id);
    if (db_res == true) {
        console.log("Added intrested event succesfully");
        return res.status(200).json({ message: "Added intrested event succesfully" });
    }

    return res.status(500).json({ error: "Internal server error" });
} 

async function checkEvent(user_id, event_id) {
    let db_res = await calendarQueries.checkEventQuery(user_id, event_id);
    if (db_res == true) {
        return true;
    } else {
        return false;
    }
}

async function removeIntrestedEvent(req, res) {
    const { user_id } = req.body;
    const { event_id } = req.body;
    let db_res = await calendarQueries.removeIntrestedEventQuery(user_id, event_id);
    if (db_res == true) {
        console.log("Removed intrested event succesfully");
        return res.status(200).json({ message: "Removed intrested event succesfully" });
    } else {
        return res.status(500).json({ error: "Internal server error" });
    }
} 


module.exports = {
    getCalendar,
    updateCalendarEvent,
    deleteCalendarEvent,
    addCalendarEvent,
    getClubEvents,
    getAllInterestedEvents,
    addIntrestedEvent,
    removeIntrestedEvent,
};