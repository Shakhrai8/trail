import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from "../map/Map";

const defaultPosition = {
  lat: 0,
  lng: 0,
};

const Startup = () => {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      () => setPosition(defaultPosition), // Use default position if location access is denied
      { timeout: 30000 } // Timeout after 30 seconds
    );
  }, []);

  return (
    <div className="root">
      <h1>Startup</h1>
      <Map center={position} zoom={10} />
      <Link to="/locations">Start Trail</Link>
    </div>
  );
};

export default Startup;
