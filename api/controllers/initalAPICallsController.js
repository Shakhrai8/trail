const fetchNearestLocations = require("../common/fetchNearestLocations");
const fetchDescription = require("../common/fetchDescription");
const fetchDistance = require("../common/fetchDistance");
const fetchTextToSpeech = require("../common/fetchTextToSpeech");

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

            let description, audio;
            try {
              description = await fetchDescription(location);
            } catch (err) {
              console.log("Error fetching description:", err);
              description = "Description not available";
            }

            try {
              audio = await fetchTextToSpeech(description);
            } catch (err) {
              console.log("Error fetching audio:", err);
              audio = "Audio not available";
            }

            return { location, distance, description, audio };
          } catch (err) {
            console.log(err);
            return {
              location,
              distance: "Distance not available",
              description: "Description not available",
              audio: "Audio not available",
            };
          }
        })
      );

      res.status(200).json(locationInfo);
    } catch (err) {
      console.error("Error occurred while fetching data:", err);
      res.status(500).json({
        error: "An error occurred while fetching data.",
      });
    }
  },
};

module.exports = initialAPICallsController;
