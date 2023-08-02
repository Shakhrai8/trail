const googleApiKey = "***REMOVED***";

const fetchDistance = async (originLatitude, originLongitude, destination) => {
  const destinationLatitude = destination.geometry.location.lat;
  const destinationLongitude = destination.geometry.location.lng;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originLatitude}%2C${originLongitude}&destinations=${destinationLatitude}%2C${destinationLongitude}&key=${googleApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("data:", data);
  return data;
};

module.exports = fetchDistance;
