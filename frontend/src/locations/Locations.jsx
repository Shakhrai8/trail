import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingTrail from "../logo/LoadingTrail";

const Locations = ({ isLoading, error, data }) => {
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

  const locationsWithTypes = (locations) => {
    const verifiedLocations = locations.map((item) => {
      if (item.types.length === 0) {
        item.types.push("Other");
      }
      return item; 
    });

    const counts = {};
    counts["All"] = verifiedLocations.length;
    verifiedLocations.forEach((location) => {
      location.types.forEach((type) => {
        if (counts[type]) {
          counts[type] += 1;
        } else {
          counts[type] = 1;
        }
      });
    });
   

    return {counts, verifiedLocations}; 
  };


  if (isLoading) return <LoadingTrail />;
  if (error) return `Error: ${error.message}`;

  const locationsWithCount = locationsWithTypes(locationsData);
  const locationsList = locationsWithCount.verifiedLocations;
  const count = locationsWithCount.counts;

 
  const filteredLocations = locationsList.filter((location) => {
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
              let numOfTypes = count[typeMap[type]] || 0;
              return numOfTypes !== 0 || type === "All";
            })
            .map((type) => {
              let numOfTypes = count[typeMap[type]];
              return (
                <option key={type} value={type}>
                  {type} {`(${numOfTypes})`}
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
      </div>
    </div>
  );
};

export default Locations;
