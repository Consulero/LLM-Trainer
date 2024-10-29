const { AzureOpenAI } = require('openai');
const { DefaultAzureCredential, getBearerTokenProvider } = require('@azure/identity');
require('dotenv').config();

const azureSearchEndpoint = 'https://llmtrainersearchservice.search.windows.net';
const azureSearchIndexName = 'trainllm';

async function main() {
  const scope = 'https://cognitiveservices.azure.com/.default';
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

  console.log('azureADTokenProvider', azureADTokenProvider);
  const deployment = 'gpt-35-turbo-0613-rnc';
  const apiVersion = '2024-07-01-preview';

  // Create the AzureOpenAI client without an apiKey
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  
  const events = await client.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'user',
        content: "What's the most common feedback we received from our customers about the product?",
      },
    ],
    
    max_tokens: 128,
    model: deployment, // You can specify the model if needed, but it can remain empty if using deployment
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
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(choice.delta?.content);
    }
  }
}

main().catch((err) => console.error('Error in main:', err));
