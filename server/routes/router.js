const express = require("express");
const calendarController = require("../controllers/calendarController");
const accountController = require("../controllers/accountController");
const messagingController = require("../controllers/messagingController");
const organizationController = require("../controllers/organizationController");
const adviceController = require("../controllers/adviceController");
const faqController = require("../controllers/faqController");
const chatController = require("../controllers/chatController");
const searchController = require("../controllers/searchController");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.post("/create_account", accountController.createAccount);
router.post("/update_username", accountController.updateUsername);
router.post("/reset_username", accountController.updateUsername);
router.post("/verify_email", accountController.verifyEmail);
router.post("/block_user", accountController.blockUser);
router.post("/unblock_user", accountController.unblockUser);
router.post("/get_follow_list", accountController.getFollowedUsers);
router.post("/get_followed_by", accountController.getFollowedBy);
router.post("/follow_user", accountController.followUser);
router.post("/unfollow_user", accountController.unfollowUser);
router.post("/get_block_list", accountController.getBlockList);
router.post("/get_calendar", calendarController.getCalendar);
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
router.post("/ban_account", accountController.banAccount);
router.post("/mark_delete_account", accountController.markDeleteAccount);
router.post("/revoke_ban", accountController.revokeBan);
router.post("/report_user", accountController.reportUser);
router.post("/ignore_report", accountController.ignoreReport);
router.post("/ban_report", accountController.banFromReport);
router.post("/get_mutual_friends", accountController.getMutualFriends);
router.post("/get_mutual_orgs", accountController.getMutualOrgs);
router.post("/toggle_dm", messagingController.toggleDM);
router.post("/msg_user", messagingController.messageUser);
router.post("/delete_account", accountController.deleteAccountAPI);
router.post("/search_users", accountController.searchUsers);
router.post("/submit_feedback", accountController.submitFeedback);
router.post("/set_preferences", accountController.setPreferences);
router.post("/get_preferences", accountController.getPreferences);
router.post("/get_interested_events", accountController.getNotifications);
router.get("/get_club_events", calendarController.getClubEvents);
router.post("/get_all_interested_events", calendarController.getAllInterestedEvents);
router.post("/add_interested_event", calendarController.addIntrestedEvent);
router.post("/remove_interested_event", calendarController.removeIntrestedEvent);
router.post("/add_org_follower", organizationController.addFollower);
router.post("/remove_org_follower", organizationController.unfollowOrg);
router.post("/is_following_org", organizationController.isFollowingOrg);
router.post("/get_friends_org", organizationController.getFriendsOrg);
router.get("/get_advice", adviceController.getAdvice);
router.post("/set_advice_setting", adviceController.setAdviceAPI);
router.get("/get_faqs", faqController.getFaqs);
router.post("/ask_question", faqController.askQuestionAPI);
router.post("/chat_bot", chatController.chatAPI);
router.post("/get_all_usernames", searchController.getAllUsernames);
router.get("/get_all_classes", searchController.getAllClasses);
router.post("/get_followed_orgs", organizationController.getFollowedOrgs);
router.post("/fav_course", courseController.favoriteCourse);
router.post("/unfav_course", courseController.unfavoriteCourse);
router.post("/get_fav_courses", courseController.getFavoriteCourses);

module.exports = router;