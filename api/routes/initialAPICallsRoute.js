const initialAPICallsController = require("../controllers/initalAPICallsController");

const express = require("express");
const router = express.Router();

router.get("/", initialAPICallsController.Index);

module.exports = router;
