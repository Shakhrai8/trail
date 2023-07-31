const RouteController = require("../controllers/RouteController");

const express = require("express");
const router = express.Router();

router.get("/", RouteController.getRoute);
router.get("/:id", RouteController.getRouteById);
router.post("/save", RouteController.saveRoute);

module.exports = router;
