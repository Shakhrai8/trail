const saveRoute = async (route) => {
  const routeName = prompt("Please enter a name for this route:");
  if (routeName === null || routeName === "") {
    alert("You must provide a name for the route.");
    return;
  }

  const routeDescription = prompt("Please enter a description for this route:");
  if (routeDescription === null || routeDescription === "") {
    alert("You must provide a description for the route.");
    return;
  }
  const routeData = {
    name: routeName,
    routeDescription: routeDescription,
    startingPoint: {
      lat: route.start.lat,
      lng: route.start.lng,
    },
    endingPoint: {
      lat: route.end.geometry.location.lat,
      lng: route.end.geometry.location.lng,
    },
    visitedLocations: route.visited.map((location) => ({
      lat: location.geometry.location.lat,
      lng: location.geometry.location.lng,
      placeId: location.place_id,
      placeName: location.name,
      description: location.description,
      photoReference: location.photoReference,
    })),
  };

  try {
    const response = await fetch("http://localhost:3000/route/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routeData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    alert("Route saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to save route!");
  }
};

export default saveRoute;
