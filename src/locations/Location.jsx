import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchDescription from "../common/fetchDescription";

const Location = ({ location }) => {
  const {
    isLoading,
    error,
    data: description,
  } = useQuery(["description", location.name, location.vicinity], fetchDescription);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <h2>{location.name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Location;
