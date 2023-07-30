import { useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import "../style.css";

const Location = ({ isLoading, error, data }) => {
  const { id } = useParams();
  const result = data.find((loc) => loc.location.place_id === id);

  // Create a ref for the audio element
  const audioRef = useRef(null);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  if (!result) return "Location not found";

  const createAudioBlob = () => {
    if (!result.audio || !result.audio.data) return null;
    const audioBlob = new Blob([Uint8Array.from(result.audio.data)], {
      type: "audio/mpeg",
    });
    return URL.createObjectURL(audioBlob);
  };

  // When the component mounts, set the src attribute of the audio element to the audio URL
  useEffect(() => {
    const audioUrl = createAudioBlob();
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
    }
    return () => {
      // Clean up the URL object when the component unmounts
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [result]);

  return (
    <div id="location-details">
      <img
        src={result.location.photoReference}
        alt={result.location.name}
        className="location-photo"
        // eslint-disable-next-line react/jsx-no-comment-textnodes
      />
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <audio className="audio-player" ref={audioRef} controls>
        {/* No need for <source> element */}
      </audio>
      <h2 className="location-header">{result.location.name}</h2>
      <p className="location-description">{result.description}</p>
    </div>
  );
};

export default Location;
