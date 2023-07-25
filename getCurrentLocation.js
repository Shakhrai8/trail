export const getCurrentLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      },
      function (error) {
        console.log("Error: " + error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by your browser.");
  }
};
