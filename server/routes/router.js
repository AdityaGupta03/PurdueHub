const express = require("express");
const accountRouter = require("./accountRouter");
const calendarController = require("../controllers/calendarController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.post("/create_account", accountController.createAccount);
router.post("/update_username", accountController.updateUsername);
router.post("/reset_username", accountController.updateUsername);
router.post("/verify_email", accountController.verifyEmail);
router.post("/block_user", accountController.blockUser);
router.post("/unblock_user", accountController.unblockUser);
router.get("/get_block_list", accountController.getBlockList);
router.get("/get_calendar", calendarController.getCalendar);
router.post("/update_calendar_event", calendarController.updateCalendarEvent);
router.post("/delete_calendar_event", calendarController.deleteCalendarEvent);
router.post("/add_calendar_event", calendarController.addCalendarEvent);
router.post("/request_new_username", accountController.resetUsername);
router.post("/verify_username_reset_code", accountController.verifyUsernameResetCode);

module.exports = router;