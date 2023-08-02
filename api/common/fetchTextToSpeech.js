const googleTextToSpeech = require("@google-cloud/text-to-speech");

const client = new googleTextToSpeech.TextToSpeechClient();

const textToSpeech = async (description) => {
  console.log(description);
  const request = {
    input: { text: description },
    voice: {
      languageCode: "en-GB",
      name: "en-GB-Neural2-D",
      ssmlGender: "MALE",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
};

module.exports = textToSpeech;
