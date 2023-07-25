import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import fetchNearestLocations from "../common/fetchNearestLocations";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export function useLocationsData() {
  const {
    isLoading,
    error,
    data: locations,
  } = useQuery(["nearestLocations"], fetchNearestLocations);

  return { isLoading, error, locations };
}

export function LocationsDataProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
