import { useState, useEffect } from "react";
import getCurrentLocation from "./getCurrentLocation";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [error, setError] = useState(null);
  const [route, setRoute] = useState({
    start: null,
    end: null,
    visited: [],
  });

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

  const markStart = (position) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      start: position,
    }));
  };

  const markVisited = (location, description) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      visited: [...prevRoute.visited, { ...location, description }],
      end: location,
    }));
  };

  const saveRoute = async () => {
    const routeName = prompt("Please enter a name for this route:");
    if (routeName === null || routeName === "") {
      alert("You must provide a name for the route.");
      return;
    }

    const routeDescription = prompt(
      "Please enter a description for this route:"
    );
    if (routeDescription === null || routeDescription === "") {
      alert("You must provide a description for the route.");
      return;
    }

    const routeData = {
      name: routeName,
      routeDescription: routeDescription,
      startingPoint: {
        lat: route.start.lat,
        lng: route.start.lng,
      },
      endingPoint: {
        lat: route.end.geometry.location.lat,
        lng: route.end.geometry.location.lng,
      },
      visitedLocations: route.visited.map((location) => ({
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
        placeId: location.place_id,
        placeName: location.name,
        description: location.description,
        photoReference: location.photoReference,
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/route/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      alert("Route saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save route!");
    }
  };

  return {
    data,
    currentPosition,
    isLoadingFirst,
    error,
    markStart,
    markVisited,
    saveRoute,
  };
};

export default useFetchData;
