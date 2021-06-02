const express = require("express");
const create_loan = require("../../controllers/loan/create_loan");
const get_loan = require("../../controllers/loan/get_loan");
const loan_actions = require("../../controllers/loan/loan_actions");
const router = express.Router();

//create User
router.post("/create", create_loan);
router.post("/fetch", get_loan);
router.post("/action", loan_actions);
module.exports = router;

