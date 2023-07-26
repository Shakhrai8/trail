import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Startup from "./startup/Startup";
import Locations from "./locations/Locations";
import Location from "./locations/Location";
import { LocationsDataProvider } from "./hooks/useLocationsData";

const App = () => {
  return (
    <BrowserRouter>
      <LocationsDataProvider>
        <header>
          <Link to="/">Trail</Link>
        </header>
        <Routes>
          <Route path="/" element={<Startup />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="locations/:id" element={<Location />} />
        </Routes>
      </LocationsDataProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
