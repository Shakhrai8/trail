const fetchDescription = require("../../common/fetchDescription.js");
require("jest-fetch-mock").enableMocks();

describe("fetchDescription", () => {
  it("fetches the description of a location", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "chatcmpl-7j3hgLI68HtWsWlFIDxVeiydtfk1F",
        object: "chat.completion",
        created: 1690973352,
        model: "gpt-3.5-turbo-16k-0613",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: "Welcome to Brighton.",
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 42,
          completion_tokens: 503,
          total_tokens: 545,
        },
      })
    );
    const location = {
      name: "Albion Millennium Green",
      vicinity: "Albion Villas Road, London",
    };

    const result = await fetchDescription(location);
    expect(result).toBe("Welcome to Brighton.");
  });
});
