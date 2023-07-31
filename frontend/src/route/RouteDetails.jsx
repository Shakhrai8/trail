import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../map/Map";

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

  return (
    <div>
      {route ? (
        <>
          <h2>{route.name}</h2>
          <p>{route.routeDescription}</p>
          <Map path={route.visitedLocations} />
          {route.visitedLocations.map((location) => (
            <div key={location.placeId}>
              <img src={location.photoReference} alt={location.name} />
              <h3>{location.name}</h3>
              <p>{location.description}</p>
            </div>
          ))}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default RouteDetails;
