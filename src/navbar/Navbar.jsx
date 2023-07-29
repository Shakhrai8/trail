import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ googleMapsUrl }) => {
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
              <a href="#" target="_blank" rel="noreferrer noopener">
                Placeholder_1
              </a>
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

export default Navbar;
