const express = require("express");
const calendarController = require("../controllers/calendarController");

const calendarRouter = express.Router();

calendarRouter.get("/get_calendar", calendarController.getCalendar);
calendarRouter.post("/update_calendar_event", calendarController.updateCalendarEvent);
calendarRouter.post("/delete_calendar_event", calendarController.deleteCalendarEvent);
calendarRouter.post("/add_calendar_event", calendarController.addCalendarEvent);

module.exports = calendarRouter;