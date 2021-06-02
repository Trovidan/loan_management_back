const express = require('express')
const auth = require('./auth')
const user = require('./user')
const loan = require('./loan')
const router = express.Router()

router.use("/auth", auth);
router.use("/user", user);
router.use("/loan", loan);

router.get("/", (req, res) => {
  res.status(200).send({ code: 200, data: "Server is Up & Running" });
});

module.exports = router