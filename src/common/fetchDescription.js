const openAiApiKey = "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";

const fetchDescription = async ({ queryKey }) => {
  const locationName = queryKey[1];

  const data = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "user",
        content: `tell me a short history of ${locationName}`,
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

export default fetchDescription;
