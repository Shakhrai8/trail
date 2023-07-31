import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react"; // Import the useEffect and useRef hooks

const Location = ({ isLoading, error, data }) => {
  const { id } = useParams();
  const result = data.find((loc) => loc.location.place_id === id);

  // Create a ref for the audio element
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if result.audio and result.audio.data exist
    if (!result.audio || !result.audio.data) return;

    const audioBlob = new Blob([Uint8Array.from(result.audio.data)], {
      type: "audio/mpeg",
    });
    const audioUrl = URL.createObjectURL(audioBlob);

    if (audioRef.current) {
      // Set the src attribute of the audio element to the generated URL
      audioRef.current.src = audioUrl;
    }

    // Clean up the URL object when the component unmounts
    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [result]);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  if (!result) return "Location not found";

  return (
    <div id="location-details">
      <img
        src={result.location.photoReference}
        alt={result.location.name}
        className="location-photo"
      />
      <h2 className="location-header">{result.location.name}</h2>
      <button className="speech-button" onClick={() => audioRef.current.play()}>
        Play
      </button>
      <p className="location-description">{result.description}</p>

      {/* Audio element with ref */}
      <audio ref={audioRef} controls>
        {/* No need for <source> element */}
      </audio>
    </div>
  );
};

export default Location;
