import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCurrentLocation from "../common/getCurrentLocation";
import Map from "../map/Map";

const defaultPosition = {
  lat: 0,
  lng: 0,
};

const Startup = () => {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    getCurrentLocation()
      .then(({ latitude, longitude }) =>
        setPosition({ lat: latitude, lng: longitude })
      )
      .catch(() => setPosition(defaultPosition));
  }, []);

  return (
    <div id="container">
      <h1>Startup</h1>
      <Map center={position} zoom={10} />
      <Link to="/locations">Start Trail</Link>
    </div>
  );
};

export default Startup;
