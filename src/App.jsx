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
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const [isLoadingSecond, setIsLoadingSecond] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLocations = await fetchNearestLocations();
        setLocations(fetchedLocations);
        setError(null);

        fetchedLocations.forEach(async (location, index) => {
          setIsLoadingSecond(true);
          try {
            const description = await fetchDescription(location);
            setLocations((prevLocations) =>
              prevLocations.map((loc, i) =>
                i === index ? { ...loc, description } : loc
              )
            );
            setIsLoadingSecond(false);
          } catch (err) {}
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setIsLoadingFirst(true);
    setTimeout(() => setIsLoadingFirst(false), 5000);
  };

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
              isLoading={isLoadingFirst}
              handleClick={handleClick}
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
            />
          }
        />
        <Route
          path="locations/:id"
          element={
            <Location
              error={error}
              locations={locations}
              isLoading={isLoadingSecond}
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
