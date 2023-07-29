import { useParams } from "react-router-dom";

const Location = ({ isLoading, error, data }) => {
  const { id } = useParams();
  const result = data.find((loc) => loc.location.place_id === id);
  console.log(result.description)
 

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  if (!result) return "Location not found";

  return (
    <div id="location-details">
      <img
        src={result.location.photoReference}
        alt={result.location.name}
        className="location-photo"
      />
      <h2 className="location-header">{result.location.name}</h2>
      <p className="location-description">{result.description}</p>
    </div>
  );
};

export default Location;
