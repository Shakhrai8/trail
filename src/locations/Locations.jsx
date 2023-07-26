import { useEffect } from "react";
import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, locations, setIsLoadingSecond }) => {
  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 6000);
  };

  return (
    <div>
      {locations.map((location) => (
        <div key={location.place_id} id="location-list">
          <Link to={`/locations/${location.place_id}`} onClick={handleClick}>
            <img src={location.photoReference} alt={location.name} />
            <h2>{location.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Locations;
