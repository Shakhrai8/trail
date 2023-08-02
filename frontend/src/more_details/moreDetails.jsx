import { useState } from "react";
import styles from "./moreDetails.module.css";

const MoreDetails = ({ googleMapsUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["sideways-navbar"]}>
      <ul className={isOpen ? "open" : ""}>
        <li>
          <button id="more-details" onClick={toggleMenu}>
            More Details
          </button>
        </li>
        {isOpen && (
          <>
            <li>
              <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener">
                Google Maps
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MoreDetails;
