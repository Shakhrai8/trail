import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "95%",
  height: "325px",
};

// We can pass any of the standard Maps API parameters to format the map
// https://developers.google.com/maps/documentation/javascript/controls
const defaultMapOptions = {
  disableDefaultUI: true,
  draggable: false,
  clickableIcons: false,
};

const Map = ({ center, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "***REMOVED***",
  });

  return isLoaded ? (
    <div className="map-overview">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={defaultMapOptions}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
