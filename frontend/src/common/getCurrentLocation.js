const getCurrentLocation = function () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          reject("Error: " + error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by your browser.");
    }
  });
};

export default getCurrentLocation;
