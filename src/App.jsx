import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Startup from "./startup/Startup";
import Locations from "./locations/Locations";
import Location from "./locations/Location";
import { LocationsDataProvider } from "./hooks/useLocationsData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
