import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Startup from "./startup/Startup";
import Locations from "./locations/Locations";
import Location from "./locations/Location";
import useFetchData from "./common/fetchData";
import NavBar from "./navbar/NavBar";
import GreetingScreen from "./logo/GreetingScreen";
import Feed from "./feed/Feed";
import RouteDetails from "./route/Routedetails";

const App = () => {
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const {
    error,
    data,
    isLoadingFirst,
    locations,
    currentPosition,
    markStart,
    markVisited,
    saveRoute,
  } = useFetchData();

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
                <Startup
                  error={error}
                  currentPosition={currentPosition}
                  data={data}
                  markStart={markStart}
                />
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
            <Route path="/feed" element={<Feed />} />
            <Route path="/route/:id" element={<RouteDetails />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
