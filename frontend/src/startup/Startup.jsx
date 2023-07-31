import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCurrentLocation from "../common/getCurrentLocation";
import Map from "../map/Map";

const defaultPosition = {
  lat: 0,
  lng: 0,
};

const Startup = ({ markStart }) => {
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
      <Map center={position} zoom={10} />
      <Link to="/locations" id="start-trail">
        <button id="start-button" onClick={() => markStart(position)}>
          Start trail
        </button>
      </Link>
    </div>
  );
};

export default Startup;
