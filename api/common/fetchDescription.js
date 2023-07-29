const openAiApiKey = "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";

const fetchDescription = async (location) => {
  const { name: locationName, vicinity } = location;

  const data = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "user",
        content: `Imagine you're a tour guide giving me a historical tour. Can you tell me about the historical significance and interesting facts of the location named ${locationName}, located somewhere around ${vicinity}?`,
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
