import { useParams } from "react-router-dom";
import BikeLoader from "../animation/BikeLoader";

const Location = ({ isLoading, error, locations }) => {
  const { id } = useParams();
  const location = locations.find((loc) => loc.place_id === id);

  if (isLoading) return <BikeLoader />;
  if (error) return `Error: ${error.message}`;
  if (!location) return "Location not found";

  return (
    <div id="location-details">
      <img
        src={location.photoReference}
        alt={location.name}
        className="location-photo"
      />
      <h2 className="location-header">{location.name}</h2>
      <p className="location-description">{location.description}</p>
    </div>
  );
};

export default Location;
