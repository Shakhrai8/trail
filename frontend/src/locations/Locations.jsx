import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, data, setIsLoadingSecond }) => {
  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  console.log("data", data);

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 3000);
  };
  console.log("data", data);

  return (
    <div id="container">
      <div id="location-list">
        {data
          .slice()
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .map((element) => {
            // Split the distance string and extract the numeric part
            const distanceNumber = parseFloat(element.distance.split(" ")[0]);

            return (
              <div key={element.location.place_id} className="location-card">
                <Link
                  to={`/locations/${element.location.place_id}`}
                  onClick={handleClick}
                >
                  <img
                    src={element.location.photoReference}
                    alt={element.location.name}
                    className="location-photo"
                  />
                  <h2 className="location-header">{element.location.name}</h2>
                  <h5 className="distance">{element.distance}</h5>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Locations;
