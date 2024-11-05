require('dotenv').config();
const { Configuration, OpenAIApi } = require('azure-openai');

async function callOpenAiApi() {
  try {
    const configuration = new Configuration({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      azure: {
        apiKey: process.env.AZURE_OPENAI_API_KEY,
        endpoint: process.env.AZURE_OPENAI_ENDPOINT,
        deploymentName: 'gpt-4o-2024-08-06-tesla_three', // Optional, can be passed in requests
      },
    });

    const openAiApi = new OpenAIApi(configuration);

    console.log('Configuration initialized successfully');

    const prompt = 'Tell me a joke';
    const response = await openAiApi.createCompletion({
      model: 'gpt-4o-2024-08-06-tesla_three',
      prompt: prompt,
      maxTokens: 100,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
    });

    console.log('Response from OpenAI:', response.data);
    return response.data;
  } catch (error) {
    console.error('Deployment error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

callOpenAiApi();
