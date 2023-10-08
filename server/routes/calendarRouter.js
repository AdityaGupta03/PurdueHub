const express = require("express");
const calendarController = require("../controllers/calendarController");

const calendarRouter = express.Router();

calendarRouter.get("/get_calendar", calendarController.getCalendar);

module.exports = calendarRouter;