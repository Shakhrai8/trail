// import { DistanceMatrixService } from "@react-google-maps/api";
// import {}
const googleApiKey = "***REMOVED***";

async function getDistance(location_id, currentPosition_id) {
  const distanceMatrixService = new DistanceMatrixService({ googleApiKey });
  const response = await distanceMatrixService.getDistanceMatrix({
    origins: [currentPosition_id],
    destinations: [location_id],
    travelMode: "DRIVING",
    unitSystem: "IMPERIAL",
  });
  console.log(response);
  if (response.status === "OK") {
    // Convert the response to a JSON object.
    const jsonObject = JSON.stringify(response);

    // Return the JSON object.
    return jsonObject;
  } else {
    // Handle the error.
  }
}
module.exports = getDistance;
