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
import RouteDetails from "./route/RouteDetails";

const App = () => {
  const [showGreeting, setShowGreeting] = useState(true);
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

  const { error, data, isLoadingFirst, currentPosition } = useFetchData();

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
                  setRoute={setRoute}
                  data={data}
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
                  route={route}
                />
              }
            />
            <Route
              path="/locations/:id"
              element={
                <Location error={error} data={data} setRoute={setRoute} />
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
