import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingTrail from "../logo/LoadingTrail";
import typeMap from "../common/typeMap";

const Locations = ({ isLoading, error, data }) => {
  const locationsData = data.map((element) => {
    return { location: element.location, distance: element.distance };
  });

  const [filterType, setFilterType] = useState("All");

  const locationsWithTypes = (locations) => {
    const verifiedLocations = locations.map((item) => {
      if (item.location.types.length === 0) {
        item.location.types.push("Other");
      }
      return item;
    });

    const counts = {};
    counts["All"] = verifiedLocations.length;
    verifiedLocations.forEach((element) => {
      element.location.types.forEach((type) => {
        if (counts[type]) {
          counts[type] += 1;
        } else {
          counts[type] = 1;
        }
      });
    });
    return { counts, verifiedLocations };
  };

  if (isLoading) return <LoadingTrail />;
  if (error) return `Error: ${error.message}`;

  const locationsWithCount = locationsWithTypes(locationsData);
  const locationsList = locationsWithCount.verifiedLocations;
  const count = locationsWithCount.counts;

  const filteredLocations = locationsList.filter((element) => {
    return (
      filterType === "All" ||
      element.location.types.includes(typeMap[filterType])
    );
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
          .map((locationItem) => {
            return (
              <figure key={locationItem.location.place_id}>
                <Link to={`/locations/${locationItem.location.place_id}`}>
                  <img
                    src={locationItem.location.photoReference}
                    alt={locationItem.location.name}
                    className="location-photo"
                  />
                  <figcaption>
                    <h2 className="location-header">
                      {locationItem.location.name}
                    </h2>
                    <h5 className="distance">{locationItem.distance}</h5>
                  </figcaption>
                </Link>
              </figure>
            );
          })}
      </div>
    </div>
  );
};

export default Locations;
