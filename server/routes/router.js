const express = require("express");
const accountController = require("../controllers/accountController");
const { resetUsername } = require("../controllers/resetController")

const router = express.Router();

router.post("/create_account", accountController.createAccount);
router.post("/update_username", accountController.updateUsername);
router.post("/reset_username", resetUsername);
router.post("/verify_email", accountController.verifyEmail);
router.post("/block_user", accountController.blockUser);
router.post("/unblock_user", accountController.unblockUser);

module.exports = router;