const fetchDistance = require("../../common/fetchDistance.js");
const fetchDescription = require("../../common/fetchDistance.js");
require("jest-fetch-mock").enableMocks();

describe("fetchDescription", () => {
  it("fetches the description of a location", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        destination_addresses: [
          "48 Norfolk Square, Brighton, Brighton and Hove, Brighton BN1 2PA, UK",
        ],
        origin_addresses: [
          "15A Montpelier Villas, Brighton, Brighton and Hove, Brighton BN1 3DG, UK",
        ],
        rows: [
          {
            elements: [
              {
                distance: {
                  text: "0.4 mi",
                  value: 674,
                },
                duration: {
                  text: "4 mins",
                  value: 221,
                },
                status: "OK",
              },
            ],
          },
        ],
        status: "OK",
      })
    );

    const destination = {
      geometry: {
        location: {
          lat: "50.825021",
          lng: "-0.154335",
        },
      },
    };

    const result = await fetchDistance(50.826871, -0.150612, destination);
    expect(result.rows[0].elements[0].distance.text).toBe("0.4 mi");
  });
});
