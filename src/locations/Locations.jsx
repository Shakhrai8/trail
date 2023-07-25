import { useQuery } from "@tanstack/react-query";
import fetchNearestLocations from "../common/fetchNearestLocations";
import Location from "./Location";

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
        <Location key={location.place_id} location={location} />
      ))}
    </div>
  );
};

export default Locations;
