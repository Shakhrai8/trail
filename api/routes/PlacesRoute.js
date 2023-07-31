const RouteController = require("../controllers/RouteController");

const express = require("express");
const router = express.Router();

router.post("/save", RouteController.saveRoute);

module.exports = router;
