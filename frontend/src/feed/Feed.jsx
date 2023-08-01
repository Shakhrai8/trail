import { useEffect, useState } from "react";
import RouteCard from "../route/RouteCard";

const Feed = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:3000/route");
        const data = await response.json();
        setRoutes(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoutes();
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <div className="route-feed">
      {routes.map((route) => (
        <RouteCard key={route._id} route={route} />
      ))}
    </div>
  );
};

export default Feed;
