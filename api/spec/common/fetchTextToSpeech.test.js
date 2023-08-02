const textToSpeech = require("../../common/fetchTextToSpeech");
const mockedAudioContent = require("../mockData/mockAudioContent");
require("jest-fetch-mock").enableMocks();

jest.mock('@google-cloud/text-to-speech', () => {
  return {
    TextToSpeechClient: jest.fn(() => ({
      synthesizeSpeech: jest.fn(() => {
        return [
          { audioContent: mockedAudioContent }
        ];
      })
    }))
  };
});

describe("fetchTextToSpeech ", () => {
  it("fetches text to speech audio", async () => {
    fetch.mockResponseOnce(mockedAudioContent);

    const description = "Welcome to Brighton.";
    const result = await textToSpeech(description);
    
    expect(result).toBe(mockedAudioContent);
  });
});
