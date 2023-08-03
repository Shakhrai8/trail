const openAiApiKey = "***REMOVED***";

const fetchDescription = async (location) => {
  const { name: locationName, vicinity } = location;

  const data = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "user",
        content: `Assume the role of an informative guide focusing on facts and historical significance. Share key details about the location named ${locationName}, located in or around ${vicinity}. Adopt a neutral personality. Don't try to be too chatty. Don't introduce yourself.`,
      },
    ],
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": JSON.stringify(data).length,
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `OpenAI API request failed with status: ${response.status}`
    );
  }

  const responseData = await response.json();

  return responseData.choices[0].message.content.trim();
};
module.exports = fetchDescription;
