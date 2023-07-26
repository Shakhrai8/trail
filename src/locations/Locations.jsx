import { Link } from "react-router-dom";
import BikeLoader from "../animation/BikeLoader";

const Locations = ({ isLoading, error, locations, setIsLoadingSecond }) => {
  if (isLoading) return <BikeLoader />;
  if (error) return `Error: ${error.message}`;

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 6000);
  };

  return (
    <div id="container">
      <div id="location-list">
        {locations.map((location) => (
          <div key={location.place_id} className="location-card">
            <Link to={`/locations/${location.place_id}`} onClick={handleClick}>
              <img
                src={location.photoReference}
                alt={location.name}
                className="location-photo"
              />
              <h2 className="location-header">{location.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
