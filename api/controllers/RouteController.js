const Route = require("../models/route");

const RouteController = {
  saveRoute: async (req, res) => {
    try {
      const {
        name,
        routeDescription,
        startingPoint,
        endingPoint,
        visitedLocations,
      } = req.body;

      const newRoute = new Route({
        name,
        routeDescription,
        startingPoint,
        endingPoint,
        visitedLocations,
      });

      await newRoute.save();

      res.status(200).json({
        message: "Route saved successfully.",
        routeId: newRoute._id,
      });
    } catch (err) {
      console.error("Error occurred while saving route:", err);
      res.status(500).json({
        error: `An error occurred while saving route: ${err.message}`,
      });
    }
  },
};

module.exports = RouteController;
