const googleApiKey = "***REMOVED***";

const fetchCurrentPosition = async () => {
  const response = await fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Google Geolocation API request failed with status: ${response.status}`
    );
  }

  const data = await response.json();

  return data.location;
};

module.exports = fetchCurrentPosition;
