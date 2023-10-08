const express = require("express");
const accountRouter = require("./accountRouter");
const calendarRouter = require("./calendarRouter");

const router = express.Router();

router.use("/account", accountRouter);
router.use("/calendar", calendarRouter);

module.exports = router;