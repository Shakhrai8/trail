import { useState, useEffect } from "react";
import getCurrentLocation from "./getCurrentLocation";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      const longitude = currentLocation.longitude;
      const latitude = currentLocation.latitude;
      const longitudeHook = Number(longitude.toString().slice(0, -3));
      const latitudeHook = Number(latitude.toString().slice(0, -3));
      const storagePositionLongitude = Number(
        localStorage.getItem("longitude")
      );
      const storagePositionLatitude = Number(localStorage.getItem("latitude"));
      if (
        longitudeHook !== storagePositionLongitude ||
        latitudeHook !== storagePositionLatitude
      ) {
        console.log("fetching data");
        localStorage.setItem("longitude", longitudeHook);
        localStorage.setItem("latitude", latitudeHook);
        setError(null);
        setIsLoadingFirst(true);

        const allData = await fetch(
          `http://localhost:3000?longitude=${longitude}&latitude=${latitude}`
        );
        const responseData = await allData.json();
        localStorage.setItem("data", JSON.stringify(responseData));
        setData(responseData);
        setIsLoadingFirst(false);
      } else {
        console.log("using local storage");
        const storageData = JSON.parse(localStorage.getItem("data"));
        setData(storageData);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPosition[0], currentPosition[1]]);

  return {
    data,
    currentPosition,
    isLoadingFirst,
    error,
  };
};

export default useFetchData;
