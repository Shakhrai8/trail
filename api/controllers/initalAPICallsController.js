const fetchNearestLocations = require("../common/fetchNearestLocations");
const fetchDescription = require("../common/fetchDescription");
const fetchDistance = require("../common/fetchDistance");

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
            let distance = await fetchDistance(latitude, longitude, location);
            distance = distance.rows[0].elements[0].distance.text;
            try {
              let description = await fetchDescription(location);

              return { location, distance, description };
            } catch (err) {
              console.log(err);
              return {
                location,
                distance,
                description: "Description not available",
              };
            }
          } catch (err) {
            console.log(err);
            return {
              location,
              distance: "Distance not available",
            };
          }
        })
      );

      res.status(200).json(locationInfo);
    } catch (err) {
      // Handle any error occurred during the process
      res.status(500).json({
        error: "An error occurred while fetching data.",
      });
    }
  },
};

module.exports = initialAPICallsController;
