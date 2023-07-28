const fetchNearestLocations = require("../common/fetchNearestLocations");
const fetchDescription = require("../common/fetchDescription");

const initialAPICallsController = {
  Index: async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const fetchedLocations = await fetchNearestLocations({
        latitude,
        longitude,
      });
      const locationInfo = await Promise.all(
        fetchedLocations.map(async (location) => {
          try {
            const description = await fetchDescription(location);
            return { location, description };
          } catch (err) {
            console.log(err);
            return { location, description: "Description not available" };
          }
        })
      );

      res.status(200).json({ locationInfo });
    } catch (err) {
      // Handle any error occurred during the process
      res.status(500).json({
        error: "An error occurred while fetching data.",
      });
    }
  },
};

module.exports = initialAPICallsController;
