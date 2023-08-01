import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCurrentLocation from "../common/getCurrentLocation";
import Map from "../map/Map";

const defaultPosition = {
  lat: 0,
  lng: 0,
};

const Startup = ({
  markStart,
  currentPosition = [defaultPosition.lat, defaultPosition.lng],
}) => {
  const newPosition = {
    lat: currentPosition[0],
    lng: currentPosition[1],
  };

  return (
    <div id="container">
      <Map center={newPosition} zoom={10} />
      <Link to="/locations" id="start-trail">
        <button id="start-button" onClick={() => markStart(newPosition)}>
          Start trail
        </button>
      </Link>
    </div>
  );
};

export default Startup;
