const express = require("express");
const calendarController = require("../controllers/calendarController");

const calendarRouter = express.Router();

// calendarRouter.post("/get_calendar", calendarController.getCalendar);

module.exports = calendarRouter;