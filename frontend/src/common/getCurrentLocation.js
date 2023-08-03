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
          if (error.code === error.PERMISSION_DENIED) {
            window.alert(
              "You have denied location permissions. Our app requires you to allow location permissions!"
            );
            window.location.reload();
          }
          reject("Error: " + error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by your browser.");
    }
  });
};

export default getCurrentLocation;
