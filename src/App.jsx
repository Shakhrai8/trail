import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Startup from "./startup/Startup";
import Locations from "./locations/Locations";
import Location from "./locations/Location";
import fetchNearestLocations from "./common/fetchNearestLocations";
import fetchDescription from "./common/fetchDescription";
import StaticLogo from "./logo/StaticLogo";
import GreetingScreen from "./logo/GreetingScreen";

const App = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [locations, setLocations] = useState([]);
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [isLoadingSecond, setIsLoadingSecond] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingFirst(true);
      setTimeout(() => setIsLoadingFirst(false), 6000);

      try {
        const fetchedLocations = await fetchNearestLocations();
        setLocations(fetchedLocations);
        setError(null);

        fetchedLocations.forEach(async (location, index) => {
          try {
            const description = await fetchDescription(location);
            setLocations((prevLocations) =>
              prevLocations.map((loc, i) =>
                i === index ? { ...loc, description } : loc
              )
            );
          } catch (err) {}
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {showGreeting && <GreetingScreen />}
      {!showGreeting && (
        <BrowserRouter>
          <header>
            <Link to="/" id="header-link">
              <StaticLogo />
            </Link>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <Startup
                  isLoading={isLoadingFirst}
                  error={error}
                  locations={locations}
                />
              }
            />
            <Route
              path="/locations"
              element={
                <Locations
                  isLoading={isLoadingFirst}
                  error={error}
                  locations={locations}
                  setIsLoadingSecond={setIsLoadingSecond}
                />
              }
            />
            <Route
              path="locations/:id"
              element={
                <Location
                  isLoading={isLoadingSecond}
                  error={error}
                  locations={locations}
                />
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
