import { useState } from "react";
import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, locations, setIsLoadingSecond }) => {
  const [filterType, setFilterType] = useState("All");

  const types = [
    "All",
    "amusement_park",
    "aquarium",
    "art_gallery",
    "church",
    "museum",
    "park",
    "zoo",
    "stadium",
    "movie_theater",
    "casino",
    "night_club",
    "restaurant",
    "bar",
    "cafe",
    "bakery",
    "lodging",
    "hotel",
    "shopping_mall",
    "library",
    "city_hall",
  ];

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 3000);
  };

  const filteredLocations = locations.filter(
    (location) => filterType === "All" || location.types.includes(filterType)
  );

  return (
    <div id="container">
      <div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div id="location-list">
        {filteredLocations.map((location) => (
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
