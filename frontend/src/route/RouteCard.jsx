import { Link } from "react-router-dom";

const RouteCard = ({ route }) => (
  <div className="route-card">
    <div className="route-card-header">
      <h2>{route.name}</h2>
    </div>
    <div className="route-card-images">
      {route.visitedLocations.slice(0, 3).map((location, index) => (
        <img
          key={index}
          src={location.photoReference}
          alt={location.placeName}
          className="route-card-image"
        />
      ))}
    </div>
    <p>{route.routeDescription}</p>
    <div className="route-card-footer">
      <Link to={`/route/${route._id}`} className="route-card-link">
        View Route
      </Link>
    </div>
  </div>
);

export default RouteCard;
