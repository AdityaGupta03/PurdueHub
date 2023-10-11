const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.post("/create_account", accountController.createAccount);
router.post("/update_username", accountController.updateUsername);
router.post("/reset_username", accountController.resetUsername);
router.post("/verify_email", accountController.verifyEmail);
router.post("/block_user", accountController.blockUser);
router.post("/unblock_user", accountController.unblockUser);
router.post("/follow_user", accountController.followUser);
router.post("/unfollow_user", accountController.unfollowUser);

module.exports = router;