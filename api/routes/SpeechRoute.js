const SpeechController = require("../controllers/SpeechController");

const express = require("express");
const router = express.Router();

router.get("/", SpeechController.Index);

module.exports = router;
