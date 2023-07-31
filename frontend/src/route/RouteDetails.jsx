import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RouteMap from "../map/RouteMap";
import LoadingTrail from "../logo/LoadingTrail";

const RouteDetails = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(`http://localhost:3000/route/${id}`);
        const data = await response.json();
        setRoute(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoute();
  }, [id]);

  if (!route) {
    return <LoadingTrail />;
  }

  const { name, routeDescription, visitedLocations, startingPoint } = route;

  return (
    <div id="container">
      <>
        <h2>{name}</h2>
        <p>{routeDescription}</p>
        <RouteMap
          startingPoint={startingPoint}
          visitedLocations={visitedLocations.map((location) => ({
            lat: location.lat,
            lng: location.lng,
          }))}
        />

        <h3>Visited places</h3>
        <div id="location-list">
          {visitedLocations.map((location) => (
            <figure key={location.placeId}>
              <img
                src={location.photoReference}
                alt={location.placeName}
                className="location-photo"
              />

              <figcaption>
                <h2 className="location-header">{location.placeName}</h2>
                {/* <p className="location-card-description">
                  {location.description}
                </p> */}
              </figcaption>
            </figure>
          ))}
        </div>
      </>
    </div>
  );
};

export default RouteDetails;
