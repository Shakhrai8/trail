import { Link } from "react-router-dom";
import Map from "../map/Map";

const Startup = ({ currentLocation }) => {
  return (
    <div id="container" className="startpage-wrapper">
      <Map
        center={{
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        }}
        zoom={15}
      />
      <Link to="/locations" id="start-trail">
        <button id="start-button">Start trail</button>
      </Link>
    </div>
  );
};

export default Startup;
