import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Startup from "./startup/Startup";
import Locations from "./locations/Locations";
import Location from "./locations/Location";
import getCurrentLocation from "./common/getCurrentLocation";
import NavBar from "./navbar/NavBar";
import GreetingScreen from "./logo/GreetingScreen";

const App = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [data, setData] = useState([]);
  // const [locations, setLocations] = useState([]);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [error, setError] = useState(null);
  const [route, setRoute] = useState({
    start: null,
    end: null,
    visited: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        const longitude = currentLocation.longitude;
        const latitude = currentLocation.latitude;
        setError(null);

        try {
          setIsLoadingFirst(true);
          // Uncomment this section if needed
          const allData = await fetch(
            `http://localhost:3000?longitude=${longitude}&latitude=${latitude}`
          );
          const responseData = await allData.json();
          console.log("responseData", responseData);
          setData(responseData);
          setIsLoadingFirst(false);
        } catch (err) {
          setError(err.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

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

  return (
    <>
      {showGreeting && <GreetingScreen />}
      {!showGreeting && (
        <BrowserRouter>
          <header>
            <Link to="/" id="header-link">
              <NavBar />
            </Link>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <Startup error={error} data={data} markStart={markStart} />
              }
            />
            <Route
              path="/locations"
              element={
                <Locations
                  isLoading={isLoadingFirst}
                  error={error}
                  data={data}
                  saveRoute={saveRoute}
                />
              }
            />
            <Route
              path="locations/:id"
              element={
                <Location error={error} data={data} markVisited={markVisited} />
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
