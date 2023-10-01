const express = require("express");
const accountController = require("./accountController");

const router = express.Router();

router.post("/create_account", accountController.createAccount);

module.exports = router;