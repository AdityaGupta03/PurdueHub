const express = require("express");
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();

accountRouter.post("/create_account", accountController.createAccount);
accountRouter.post("/update_username", accountController.updateUsername);
accountRouter.post("/reset_username", accountController.resetUsername);
accountRouter.post("/verify_email", accountController.verifyEmail);
accountRouter.post("/block_user", accountController.blockUser);
accountRouter.post("/unblock_user", accountController.unblockUser);

module.exports = accountRouter;