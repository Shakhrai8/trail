import { useQuery } from "@tanstack/react-query";
import fetchDescription from "../common/fetchDescription";
import { useParams } from "react-router-dom";
import { useLocationsData } from "../hooks/useLocationsData";

const Location = () => {
  const { id } = useParams();

  const {
    isLoading: locationsLoading,
    error: locationsError,
    locations,
  } = useLocationsData();

  const location = locations.find((loc) => loc.place_id === id);

  const {
    isLoading: descriptionLoading,
    error: descriptionError,
    data: description,
  } = useQuery(
    ["description", location.name, location.vicinity, id],
    fetchDescription
  );

  if (locationsLoading || descriptionLoading) return "Loading...";
  if (locationsError) return `Error: ${locationsError.message}`;
  if (!location) return "Location not found";
  if (descriptionError) return `Error: ${descriptionError.message}`;

  return (
    <div id="location-details">
      <img
        src={location.photoReference}
        alt={location.name}
        className="location-photo"
      />
      <h2 className="location-header">{location.name}</h2>
      <p className="location-description">{description}</p>
    </div>
  );
};

export default Location;
