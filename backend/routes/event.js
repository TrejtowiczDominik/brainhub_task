const express = require("express");
const eventController = require("../controllers/event");

const router = express.Router();

router.post("/add-event", eventController.postAddEvent);

module.exports = router;
