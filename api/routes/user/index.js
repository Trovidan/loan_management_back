const express = require('express');
const create_user = require('../../controllers/user/create_user');
const router = express.Router();

//create User

router.post('/create', create_user);

module.exports = router;