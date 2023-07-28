import styles from "./Navbar.module.css";

const Navbar = ({ googleMapsUrl }) => {
  return (
    <div className={styles["sideways-navbar"]}>
      <nav style={{ "--count": "4" }}>
        <ul>
          <li style={{ "--index": "1" }}>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <span>More Details</span>
            </a>
          </li>
          <li style={{ "--index": "2" }}>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer noopener">
              <span>Google Maps</span>
            </a>
          </li>
          <li style={{ "--index": "3" }}>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <span>Placeholder_1</span>
            </a>
          </li>
          <li style={{ "--index": "4" }}>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <span>Placeholder_2</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
