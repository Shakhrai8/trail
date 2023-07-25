const getCurrentLocation = require("./getCurrentLocation");
const googleApiKey = "***REMOVED***";

const fetchNearestPlaces = async () => {
  const currentPosition = await getCurrentLocation();

  if (!currentPosition) {
    throw new Error("Unable to get current position.");
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=3000&type=tourist_attraction&key=${googleApiKey}`
  );

  if (!response.ok) {
    throw new Error(
      `Google Places API request failed with status: ${response.status}`
    );
  }

  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error(`Google Places API Error: ${data.status}`);
  }

  return data.results.slice(0, 5);
};

module.exports = fetchNearestPlaces;
