import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, data, setIsLoadingSecond }) => {
  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 3000);
  };

  return (
    <div id="container">
      <div id="location-list">
        {data.locationInfo.map(
          (location) =>
            console.log(location.location.photoReference) && (
              <div key={location.location.place_id} className="location-card">
                <Link
                  to={`/locations/${location.location.place_id}`}
                  onClick={handleClick}
                >
                  <img
                    src={location.location.photoReference}
                    alt={location.location.name}
                    className="location-photo"
                  />
                  <h2 className="location-header">{location.location.name}</h2>
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Locations;
