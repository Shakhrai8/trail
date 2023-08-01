import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const RouteMap = ({ startingPoint, visitedLocations }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "***REMOVED***", 
  });

  // endingPoint is the last visited location
  const endingPoint = visitedLocations[visitedLocations.length - 1];

  // create a path that includes the starting point, visited locations
  const path = [startingPoint, ...visitedLocations];

  return isLoaded ? (
    <div className="map-overview">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startingPoint}
        zoom={13}
      >
        <Marker position={startingPoint} label="S" />
        {visitedLocations.map((location, i) => (
          <Marker key={i} position={location} />
        ))}
        <Marker position={endingPoint} label="E" />
        <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default RouteMap;
