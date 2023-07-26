import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, locations }) => {
  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      {locations.map((location) => (
        <div key={location.place_id} id="location-list">
          <Link to={`/locations/${location.place_id}`}>
            <img src={location.photoReference} alt={location.name} />
            <h2>{location.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Locations;
