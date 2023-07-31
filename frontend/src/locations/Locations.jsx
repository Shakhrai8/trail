import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingTrail from "../logo/LoadingTrail";

const Locations = ({ isLoading, error, data, saveRoute }) => {
  const locationsData = data.map((element) => element.location);
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

  const typeCounts = countTypes(locationsData);

  if (isLoading) return <LoadingTrail />;
  if (error) return `Error: ${error.message}`;

  const assignNoType = (locations) => {
    return locations.map((item) => {
      const location = item.location;
      if (location.types.length === 0) {
        location.types.push("Other");
      }
      return item; // return original item to preserve other data
    });
  };

  const locationsWithTypes = assignNoType(data).map(
    (element) => element.location
  );

  const filteredLocations = locationsWithTypes.filter((location) => {
    return filterType === "All" || location.types.includes(typeMap[filterType]);
  });

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
        {filteredLocations
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .map((locationItem) => (
            <figure key={locationItem.place_id}>
              <Link to={`/locations/${locationItem.place_id}`}>
                <img
                  src={locationItem.photoReference}
                  alt={locationItem.name}
                  className="location-photo"
                />
                <figcaption>
                  <h2 className="location-header">{locationItem.name}</h2>
                  <h5 className="distance">{locationItem.distance}</h5>
                </figcaption>
              </Link>
            </figure>
          ))}
        <button onClick={saveRoute}>Save Route</button>
      </div>
    </div>
  );
};

export default Locations;
