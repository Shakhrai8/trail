import { useState, useEffect } from "react";
import getCurrentLocation from "./getCurrentLocation";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [error, setError] = useState(null);
  const [route, setRoute] = useState({
    start: null,
    end: null,
    visited: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        const longitude = currentLocation.longitude;
        const latitude = currentLocation.latitude;
        const longitudeHook = Number(longitude.toString().slice(0, -3));
        const latitudeHook = Number(latitude.toString().slice(0, -3));

        setCurrentPosition([latitudeHook, longitudeHook]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    locations,
    currentPosition,
    isLoadingFirst,
    error,
    markStart,
    markVisited,
    saveRoute,
  };
};

export default useFetchData;
