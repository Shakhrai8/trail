import getCurrentLocation from "./getCurrentLocation";

const googleApiKey = "***REMOVED***";

const fetchNearestLocations = async () => {
  const currentPosition = await getCurrentLocation();

  if (!currentPosition) {
    throw new Error("Unable to get current position.");
  }

  const response = await fetch(
    `/api/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=500&type=tourist_attraction&key=${googleApiKey}`
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

export default fetchNearestLocations;
