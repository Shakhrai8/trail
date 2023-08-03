/* eslint-disable jsx-a11y/media-has-caption */
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import MoreDetails from "../more_details/moreDetails";
import LoadingTrail from "../logo/LoadingTrail";
import convertAudio from "../common/convertAudio";

const Location = ({ error, data, isLoading }) => {
  const { id } = useParams();
  const result = data
    ? data.find((loc) => {
        return loc.location.place_id === id;
      })
    : [];

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const API_URL =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? "https://trail-api-production.up.railway.app"
      : "http://localhost:3000";

  useEffect(() => {
    const fetchSpeech = async () => {
      try {
        const response = await fetch(`${API_URL}/speech?${result.description}`);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpeech().then((audioResult) => {
      convertAudio(audioResult, audioRef);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  const googleMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  if (isLoading) return <LoadingTrail />;
  if (error) return `Error: ${error.message}`;
  if (!result) return "Location not found";
  const fallbackImage = "../icon-image-not-found-free-vector.jpg";

  return (
    <div id="container">
      <div id="location-details">
        <img
          src={
            result.location.photoReference === null
              ? fallbackImage
              : result.location.photoReference
          }
          alt={result.location.name}
          className="location-photo"
        />
        <h2 className="location-header">{result.location.name}</h2>
        <h4>
          {result.location.opening_hours ? (
            <p className="location-open">Open Now</p>
          ) : (
            <p className="location-closed">Closed Now</p>
          )}
        </h4>
        <div className="rating-container">
          <FontAwesomeIcon
            icon={faStar}
            size="lg"
            style={{ color: "#498f85" }}
          />
          <span className="rating">
            {result.location.rating} ({result.location.user_ratings_total})
          </span>
        </div>
        <button className="speech-button" onClick={toggleAudio}>
          {isPlaying ? (
            <FontAwesomeIcon
              icon={faPause}
              size="xl"
              style={{ color: "#498f85" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              size="xl"
              style={{ color: "#498f85" }}
            />
          )}
        </button>

        <div className="location-description">
          <ReactMarkdown>{result.description}</ReactMarkdown>
        </div>

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
