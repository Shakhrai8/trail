import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Startup from "./startup/Startup";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Link to="/">Trail</Link>
        </header>
        <Routes>
          <Route path="/" element={<Startup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
