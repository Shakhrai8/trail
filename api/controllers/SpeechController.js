const fetchTextToSpeech = require("../common/fetchTextToSpeech");

const SpeechController = {
  Index: async (req, res) => {
    const description = Object.keys(req.query)[0];

    try {
      audio = await fetchTextToSpeech(description);
    } catch (err) {
      console.log("Error fetching audio:", err);
      audio = "Audio not available";
    }
    res.status(200).json(audio);
    return { audio };
  },
};

module.exports = SpeechController;
