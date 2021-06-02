const express = require('express');
const login = require('../../controllers/auth/login');
const validate = require('../../controllers/auth/validate');
const router = new express.Router();

router.post('/login', login);
router.get("/validate", validate);

module.exports = router;
