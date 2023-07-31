import { Link } from "react-router-dom";

const RouteCard = ({ route }) => (
  <div className="route-card">
    <h2>{route.name}</h2>
    <p>{route.routeDescription}</p>
    <Link to={`/route/${route._id}`}>View Route</Link>
  </div>
);

export default RouteCard;
