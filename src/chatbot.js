const { getOpenaiClient } = require('./openaiClient');

async function chatbot(userPrompt) {
  try {
    const client = getOpenaiClient();
    const azureSearchEndpoint = 'https://llmtrainersearchservice.search.windows.net';
    const azureSearchIndexName = 'trainllm';

    console.info(`User Prompt: \n${userPrompt}\n`);

    let res = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a specialized AI assistant focused exclusively on electric vehicle services and repair-related inquiries. Politely decline any questions that are outside this domain and request clarification if the user’s query is ambiguous. Verify the user's car model to ensure responses are accurate and tailored to the correct vehicle specifications. Whenever possible, offer clear, step-by-step guidance for troubleshooting and resolving issues.`,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      data_sources: [
        {
          type: 'azure_search',
          parameters: {
            endpoint: azureSearchEndpoint,
            index_name: azureSearchIndexName,
            authentication: {
              type: 'system_assigned_managed_identity',
            },
          },
        },
      ],
      max_tokens: 900,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response = res.choices[0]?.message?.content;

    nullContent = 'The requested information is not available in the retrieved data. Please try another query or topic';
    if (response && response != '' && !response.includes(nullContent)) {
      console.info(`Chatbot response from Azure Search: \n${response}\n\n`);
    } else {
      res = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant for electric vehicle queries only ask for clarification if needed.`,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const fallbackResponse = res.choices[0]?.message?.content;
      console.info(`Fine-tuned model response: \n${fallbackResponse}\n\n`);
    }
  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    throw error;
  }
}

(async () => {
  try {
    const prompt = 'how are you?';
    await chatbot(prompt);
  } catch (error) {
    console.error('Error calling chatbot:', error);
  }
})();
