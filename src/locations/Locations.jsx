import { useState } from "react";
import { Link } from "react-router-dom";

const Locations = ({ isLoading, error, locations, setIsLoadingSecond }) => {
  const [filterType, setFilterType] = useState("All");

  const typeMap = {
    All: "All",
    "Amusement Park": "amusement_park",
    Aquarium: "aquarium",
    "Art Gallery": "art_gallery",
    Church: "church",
    Museum: "museum",
    Park: "park",
    Zoo: "zoo",
    Stadium: "stadium",
    "Movie Theater": "movie_theater",
    Casino: "casino",
    "Night Club": "night_club",
    Restaurant: "restaurant",
    Bar: "bar",
    Cafe: "cafe",
    Bakery: "bakery",
    Lodging: "lodging",
    Hotel: "hotel",
    "Shopping Mall": "shopping_mall",
    Library: "library",
    "City Hall": "city_hall",
    Other: "Other",
  };

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const handleClick = () => {
    setIsLoadingSecond(true);
    setTimeout(() => setIsLoadingSecond(false), 3000);
  };

  const assignNoType = (locations) => {
    return locations.map((location) => {
      if (location.types.length === 0) {
        location.types.push("Other");
      }
      return location;
    });
  };

  locations = assignNoType(locations);

  const filteredLocations = locations.filter(
    (location) =>
      filterType === "All" || location.types.includes(typeMap[filterType])
  );

  return (
    <div id="container">
      <div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {Object.keys(typeMap).map((type) => (
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
