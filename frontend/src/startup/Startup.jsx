import { Link } from "react-router-dom";
import Map from "../map/Map";

const Startup = ({ currentLocation, setRoute }) => {
  console.log(currentLocation);
  const defaultPosition = {
    lat: 0,
    lng: 0,
  };

  const newPosition =
    currentLocation === null
      ? defaultPosition
      : {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        };

  const markStart = (position) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      start: position,
    }));
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
