import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import LoadingTrail from "../logo/LoadingTrail";
import MoreDetails from "../more_details/MoreDetails";

const Location = ({ isLoading, error, locations }) => {
  const { id } = useParams();
  const location = locations.find((loc) => loc.place_id === id);

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
      <div className="rating-container">
        <FaStar className="rating-icon" />
        <span className="rating">
          {location.rating} ({location.user_ratings_total})
        </span>
      </div>

      <p className="location-description">{location.description}</p>
      <MoreDetails
        googleMapsUrl={googleMapsUrl(
          location.geometry.location.lat,
          location.geometry.location.lng
        )}
      />
    </div>
  );
};

export default Location;
