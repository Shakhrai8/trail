import React from "react";
import { Link } from "react-router-dom";

const Startup = () => {
  return (
    <div className="root">
      <h1>Startup</h1>
      <Link to="/locations">Start Trail</Link>
    </div>
  );
};

export default Startup;
