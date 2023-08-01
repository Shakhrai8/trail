/* eslint-disable jsx-a11y/media-has-caption */
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useRef, useState } from "react";
import MoreDetails from "../more_details/moreDetails";
import convertAudio from "../common/convertAudio";

const Location = ({ error, data, setRoute }) => {
  const { id } = useParams();
  const result = data.find((loc) => loc.location.place_id === id);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const audio = convertAudio(setIsPlaying, result, audioRef);
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const markVisited = (location, description) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      visited: [...prevRoute.visited, { ...location, description }],
      end: location,
    }));
  };

  const googleMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  if (error) return `Error: ${error.message}`;
  if (!result) return "Location not found";

  return (
    <div id="container">
      <div id="location-details">
        <img
          src={result.location.photoReference}
          alt={result.location.name}
          className="location-photo"
        />
        <h2 className="location-header">{result.location.name}</h2>
        <div className="rating-container">
          <FaStar className="rating-icon" />
          <span className="rating">
            {result.location.rating} ({result.location.user_ratings_total})
          </span>
        </div>
        <button className="speech-button" onClick={toggleAudio}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>

        <button
          className="mark-visited"
          onClick={() => markVisited(result.location, result.description)}
        >
          Mark as visited
        </button>

        <p className="location-description">{result.description}</p>
        <audio hidden ref={audioRef} controls></audio>
        <MoreDetails
          googleMapsUrl={googleMapsUrl(
            result.location.geometry.location.lat,
            result.location.geometry.location.lng
          )}
        />
      </div>
    </div>
  );
};

export default Location;
