const textToSpeechController = require("../controllers/textToSpeechController");

const express = require("express");
const router = express.Router();

router.get("/locations/text-to-speech", textToSpeechController.Index);

module.exports = router;
