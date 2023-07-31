import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingTrail from "../logo/LoadingTrail";

const Locations = ({ isLoading, error, data }) => {
  const result = data.map((element) => {
    console.log(element.location.name);
    return element.location;
  });
  const [filterType, setFilterType] = useState("All");
  console.log(result[0].name);
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

  const typeCounts = countTypes(result);

  if (isLoading) return <LoadingTrail />;
  if (error) return `Error: ${error.message}`;

  // const assignNoType = (locations) => {
  //   return locations.map((location) => {
  //     if (location.types.length === 0) {
  //       location.types.push("Other");
  //     }
  //     return location;
  //   });
  // };

  // result = assignNoType(result);

  const filteredLocations = result.filter((location) => {
    filterType === "All" || location.types.includes(typeMap[filterType]);
  });
  console.log(filteredLocations);

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
        {data
          .slice()
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .map((element) => {
            // Split the distance string and extract the numeric part
            // eslint-disable-next-line no-unused-vars
            const distanceNumber = parseFloat(element.distance.split(" ")[0]);

            {
              filteredLocations.map((result) => (
                <figure key={result.place_id}>
                  <Link to={`/locations/${result.place_id}`}>
                    <img
                      src={result.photoReference}
                      alt={result.name}
                      className="location-photo"
                    />
                    <figcaption>
                      <h2 className="location-header">{result.name}</h2>
                      <h5 className="distance">{result.distance}</h5>
                    </figcaption>
                  </Link>
                </figure>
              ));
            }
          })}
      </div>
    </div>
  );
};

export default Locations;
