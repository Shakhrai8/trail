const fetchNearestLocations = require("../../common/fetchNearestLocations");
const mockResponseData = require("../mockData/mockLocationsResponse.json");
require("jest-fetch-mock").enableMocks();

describe("fetchNearestLocations", () => {
  it("fetches 5 nearest locations", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponseData));

    const location = { longitude: 0.5, latitude: 0.1 };

    const result = await fetchNearestLocations(location);
    expect(result.length).toBe(5);
    expect(result[0].name).toBe("Horniman Museum and Gardens");
    expect(result[0].photoReference).toBe(
      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=Aaw_FcL3-NtGMb_8EOiJCEx_4wqKaPjTbOjp6wlae6QkY4usjh5K2iFYADTnqgEkHcrFFhR6a_2mFzV-qJVew71Z02WHonRd704Hd7mzlkSUmEaN_kDu1xXpMXA8pv0rhDapXx3mR6j8N68jIrCx1MaIszucXsp6cpdoFFKC6l8C39a2FTAE&key=***REMOVED***"
    );
  });

  it("returns an error", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    const location = { longitude: 0.5, latitude: 0.1 };

    try {
      await fetchNearestLocations(location);
    } catch (error) {
      expect(error.message).toBe(
        "Google Places API request failed with status: 500"
      );
    }
  });
});
