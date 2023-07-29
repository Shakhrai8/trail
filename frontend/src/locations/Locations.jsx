import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, data, setIsLoadingSecond }) => {
  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  console.log("data", data);

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 3000);
  };

  return (
    <div id="container">
      <div id="location-list">
        {data.map((element) => (
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
