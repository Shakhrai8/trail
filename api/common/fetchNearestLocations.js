const googleApiKey = "***REMOVED***";

const fetchNearestLocations = async ({ longitude, latitude }) => {
  const googleRequest = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&rankby=distance&type=tourist_attraction&key=${googleApiKey}`;
  try {
    const response = await fetch(googleRequest);

    if (!response.ok) {
      throw new Error(
        `Google Places API request failed with status: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google Places API Error: ${data.status}`);
    }

    return data.results.slice(0, 5).map((result) => ({
      ...result,
      photoReference:
        result.photos && result.photos.length > 0
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${googleApiKey}`
          : null,
    }));
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchNearestLocations;
