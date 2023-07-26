import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Startup from "./startup/Startup";
import Locations from "./locations/Locations";
import Location from "./locations/Location";
import fetchNearestLocations from "./common/fetchNearestLocations";
import fetchDescription from "./common/fetchDescription";

const App = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedLocations = await fetchNearestLocations();

        // Set locations state as soon as data from Google API is available
        setLocations(fetchedLocations);
        setError(null);

        // Start fetching descriptions from OpenAI API in the background
        fetchedLocations.forEach(async (location, index) => {
          try {
            const description = await fetchDescription(location);
            // Update the locations state with descriptions as they become available
            setLocations((prevLocations) =>
              prevLocations.map((loc, i) =>
                i === index ? { ...loc, description } : loc
              )
            );
          } catch (err) {
            // handle errors for individual description fetches if necessary
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <header>
        <Link to="/">Trail</Link>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Startup
              isLoading={isLoading}
              error={error}
              locations={locations}
            />
          }
        />
        <Route
          path="/locations"
          element={
            <Locations
              isLoading={isLoading}
              error={error}
              locations={locations}
            />
          }
        />
        <Route
          path="locations/:id"
          element={
            <Location
              isLoading={isLoading}
              error={error}
              locations={locations}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
