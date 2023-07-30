const textToSpeech = require("../common/fetchTextToSpeech");

const textToSpeechController = {
  Index: async (req, res) => {
    console.log("this is textToSpeechController");
    const { description } = req.query;
    console.log(description);
    try {
      const audio = await textToSpeech(description);
      res.status(200).send(audio);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while fetching audio.",
      });
    }
  },
};

module.exports = textToSpeechController;
