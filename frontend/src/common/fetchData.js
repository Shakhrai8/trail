import { useState, useEffect } from "react";
import getCurrentLocation from "./getCurrentLocation";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        const longitude = currentLocation.longitude;
        const latitude = currentLocation.latitude;
        const longitudeHook = Number(longitude.toString().slice(0, -3));
        const latitudeHook = Number(latitude.toString().slice(0, -3));

        setCurrentPosition([longitudeHook, latitudeHook]);
        setError(null);

        setIsLoadingFirst(true);
        // Uncomment this section if needed
        const allData = await fetch(
          `http://localhost:3000?longitude=${longitude}&latitude=${latitude}`
        );
        const responseData = await allData.json();
        setData(responseData);
        const locations = responseData.map((location) => {
          return location.location;
        });
        setLocations(locations);
        setIsLoadingFirst(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [currentPosition[0], currentPosition[1]]);

  return {
    data,
    locations,
    currentPosition,
    isLoadingFirst,
    error,
  };
};

export default useFetchData;
