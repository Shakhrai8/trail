import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingTrail from "../logo/LoadingTrail";


const Locations = ({ isLoading, error, locations }) => {
  const [filterType, setFilterType] = useState("All");

  // I left this syntax because prettier keeps changing it back, functionwise it wont cause any problems.
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

  const countTypes = (locations) => {
    const counts = {};
    counts["All"] = locations.length;
    locations.forEach((location) => {
      location.types.forEach((type) => {
        if (counts[type]) {
          counts[type] += 1;
        } else {
          counts[type] = 1;
        }
      });
    });
    return counts;
  };

  const typeCounts = countTypes(locations);

  if (isLoading) return <LoadingTrail />;
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
          className="type-dropdown"
        >
          {Object.keys(typeMap)
            .filter((type) => {
              let count = typeCounts[typeMap[type]] || 0;
              return count !== 0 || type === "All";
            })
            .map((type) => {
              let count = typeCounts[typeMap[type]];
              return (
                <option key={type} value={type}>
                  {type} {`(${count})`}
                </option>
              );
            })}
        </select>
      </div>
      <div id="location-list">
        {filteredLocations.map((location) => (
          <div key={location.place_id} className="location-card">
            <Link to={`/locations/${location.place_id}`}>
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
