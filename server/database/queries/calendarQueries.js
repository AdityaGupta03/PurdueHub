const pool = require("../db");

async function createCalendarQuery(user_id) {
  const query = "INSERT INTO calendars (user_id) VALUES ($1) RETURNING id";
  const data = [ user_id ];

  try {
    const { rows } = await pool.query(query, data);
    return rows[0].id;
  } catch (err) {
    console.log(err);
    return null;
  }
}

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

async function updateCalendarEventQuery(calendar_event) {
    const query = "UPDATE calendar_events SET start_date = $1, end_date = $2, title = $3, description = $4, location = $5, organization_id = $6 WHERE id = $7";
    const data = [ calendar_event.start, calendar_event.end, calendar_event.title, calendar_event.description, calendar_event.location, calendar_event.organization_id, calendar_event.id ];

    try {
        await pool.query(query, data);
    } catch (error) {
        console.error("[Error] updateCalendarEventQuery");
        throw error;
    }
}

async function deleteCalendarEventQuery(id) {
    const query = "DELETE FROM calendar_events WHERE id = $1";
    const data = [ id ];

    try {
        await pool.query(query, data);
    } catch (error) {
        console.error("[Error] deleteCalendarEventQuery");
        throw error;
    }
}

async function addCalendarEventQuery(calendar_event) {
    const query = "INSERT INTO calendar_events (start_date, end_date, title, description, location, organization_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id"
    const data = [ calendar_event.start, calendar_event.end, calendar_event.title, calendar_event.description, calendar_event.location, calendar_event.organization_id ];

    try {
        let db_res = await pool.query(query, data);
        return db_res.rows[0].id;
    } catch (error) {
        console.error("[Error] addCalendarEventQuery");
        throw error;
    }
}

async function removeCalendarEventsArrQuery(username, id) {
    const query = "UPDATE calendars SET calendar_events_arr = array_remove(calendar_events_arr, $1) WHERE user_id = (SELECT user_id FROM users WHERE username = $2)";
    const data = [ id, username ];

    try {
        await pool.query(query, data);
    } catch (error) {
        console.error("[Error] removeCalendarEventsArrQuery");
        throw error;
    }
}

async function addCalendarEventsArrQuery(username, id) {
    const query = "UPDATE calendars SET calendar_events_arr = array_append(calendar_events_arr, $1) WHERE user_id = (SELECT user_id FROM users WHERE username = $2)";
    const data = [ id, username ];

    try {
        await pool.query(query, data);
    } catch (error) {
        console.error("[Error] addCalendarEventsArrQuery");
        throw error;
    }
}

async function isCalendarEventInUseQuery(id) {
    const query = "SELECT * FROM calendars WHERE $1 = ANY(calendar_events_arr)";
    const data = [ id ];

    try {
        const { rows } = await pool.query(query, data);
        return rows.length > 0;
    } catch (error) {
        console.error("[Error] isCalendarEventInUseQuery");
        throw error;
    }
}

async function deleteCalendarQuery(calendar_id) {
    const query = "DELETE FROM calendars WHERE id = $1";
    const data = [ calendar_id ];
  
    try {
      await pool.query(query, data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

async function getCalendarInfoFromIdQuery(event_id) {
    const query = "SELECT * FROM calendar_events WHERE id = $1";
    const data = [ event_id ];

    try {
        const { rows } = await pool.query(query, data);
        return rows[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAllClubEventsQuery() {
    const query = "SELECT * FROM calendar_events WHERE professional_development = 1 OR club_callouts = 1";

    try {
        const db_res = await pool.query(query, []);
        return db_res;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAllInterestedEvents(user_id) {
    const query = "SELECT * FROM calendar_events WHERE id = ANY(SELECT unnest(interested_events) FROM users WHERE user_id = $1)";
    const data = [ user_id ];

    try {
        const db_res = await pool.query(query, data);
        return db_res;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function addIntrestedEventQuery(user_id, event_id) {
    const query = `UPDATE users SET interested_events = ARRAY_APPEND(interested_events, $1) WHERE user_id = $2`;
    const data = [ event_id, user_id ];
    try {
        const db_res = await pool.query(query, data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
      }
}

async function checkEventQuery(user_id, event_id) {
    const query = `SELECT * FROM users WHERE $1 = ANY(interested_events) AND user_id = $2`;
    const data = [ event_id, user_id ];

    try {
        const db_res = await pool.query(query, data);
        if (db_res.rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function removeIntrestedEventQuery(user_id, event_id) {
    const query = `UPDATE users SET interested_events = ARRAY_REMOVE(interested_events, $1) WHERE user_id = $2`;
    const data = [ event_id, user_id ];
    try {
        const db_res = await pool.query(query, data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
      }
}



module.exports = {
    getCalendarQuery,
    getCalendarEventsQuery,
    getAllCalendarEventsQuery,
    updateCalendarEventQuery,
    deleteCalendarEventQuery,
    addCalendarEventQuery,
    removeCalendarEventsArrQuery,
    addCalendarEventsArrQuery,
    isCalendarEventInUseQuery,
    createCalendarQuery,
    deleteCalendarQuery,
    getCalendarInfoFromIdQuery,
    getAllClubEventsQuery,
    getAllInterestedEvents,
    addIntrestedEventQuery,
    checkEventQuery,
    removeIntrestedEventQuery,
};