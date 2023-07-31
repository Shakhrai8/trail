import { useState } from "react";
import { Link } from "react-router-dom";
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
          <button onClick={toggleMenu}>More Details</button>
        </li>
        {isOpen && (
          <>
            <li>
              <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener">
                Google Maps
              </a>
            </li>
            <li>
              <Link to="/feed" target="_blank" rel="noreferrer noopener">
                View Routes
              </Link>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer noopener">
                Placeholder_2
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MoreDetails;
