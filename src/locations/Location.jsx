import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingTrail from "../logo/LoadingTrail";
import Navbar from "../navbar/Navbar";

const Location = ({ isLoading, error, locations }) => {
  const { id } = useParams();
  const location = locations.find((loc) => loc.place_id === id);
  const [showDropdown, setShowDropdown] = useState(false);

  if (isLoading) return <LoadingTrail />;
  if (error) return `Error: ${error.message}`;
  if (!location) return "Location not found";

  const googleMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  return (
    <div id="location-details">
      <img
        src={location.photoReference}
        alt={location.name}
        className="location-photo"
      />
      <h2 className="location-header">{location.name}</h2>

      <Navbar />

      <button onClick={() => setShowDropdown(!showDropdown)}>
        More options
      </button>

      {showDropdown && (
        <div className="dropdown">
          <a
            className="dropdown-item"
            href={googleMapsUrl(
              location.geometry.location.lat,
              location.geometry.location.lng
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      )}
      <p className="location-description">{location.description}</p>
    </div>
  );
};

export default Location;
