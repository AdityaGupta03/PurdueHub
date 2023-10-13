const express = require("express");
const calendarController = require("../controllers/calendarController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.post("/create_account", accountController.createAccount);
router.post("/update_username", accountController.updateUsername);
router.post("/reset_username", accountController.updateUsername);
router.post("/verify_email", accountController.verifyEmail);
router.post("/block_user", accountController.blockUser);
router.post("/unblock_user", accountController.unblockUser);
router.post("/follow_user", accountController.followUser);
router.post("/unfollow_user", accountController.unfollowUser);
router.get("/get_block_list", accountController.getBlockList);
router.get("/get_calendar", calendarController.getCalendar);
router.post("/update_calendar_event", calendarController.updateCalendarEvent);
router.post("/delete_calendar_event", calendarController.deleteCalendarEvent);
router.post("/add_calendar_event", calendarController.addCalendarEvent);
router.post("/request_new_username", accountController.resetUsername);
router.post("/verify_username_reset_code", accountController.verifyUsernameResetCode);
router.post("/request_new_password", accountController.resetPassword);
router.post("/verify_password_reset_code", accountController.verifyPasswordResetCode);
router.post("/update_password", accountController.updatePassword);
router.post("/login", accountController.login);
router.post("/get_profile_info", accountController.getProfileData);
router.post("/update_username_id", accountController.updateUsernameFromID);
router.post("/update_bio", accountController.editProfileBio);
// router.post("/update_profile_picture", accountController.editProfilePicture);

module.exports = router;