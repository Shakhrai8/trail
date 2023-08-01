const Route = require("../models/route");

const RouteController = {
  getRoute: async (req, res) => {
    try {
      const routes = await Route.find();
      res.status(200).json(routes);
    } catch (err) {
      console.error("Error occurred while fetching routes:", err);
      res.status(500).json({
        error: `An error occurred while fetching routes: ${err.message}`,
      });
    }
  },

  getRouteById: async (req, res) => {
    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res.status(404).json({
          error: "Route not found",
        });
      }
      res.status(200).json(route);
    } catch (err) {
      console.error("Error occurred while fetching route:", err);
      res.status(500).json({
        error: `An error occurred while fetching route: ${err.message}`,
      });
    }
  },

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
