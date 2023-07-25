import { useQuery } from "@tanstack/react-query";
import fetchNearestLocations from "../common/fetchNearestLocations";
import { Link } from "react-router-dom";

const Locations = () => {
  const { isLoading, error, data } = useQuery(
    ["nearestLocations"],
    fetchNearestLocations
  );

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      {data.map((location) => (
        <Link key={location.place_id} to={`/locations/${location.place_id}`}>
          <img src={location.photoReference} alt={location.name} />
          <h2>{location.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default Locations;
