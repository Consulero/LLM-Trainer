require('dotenv').config();
const axios = require('axios');
const { DefaultAzureCredential } = require('@azure/identity');

const DEPLOYMENT_NAME = 'gpt-35-turbo-0613-testing';
async function deployModel() {
  try {
    const credential = new DefaultAzureCredential();
    const tokenResponse = await credential.getToken('https://management.azure.com/.default');
    const accessToken = tokenResponse.token;

    const response = await axios.put(
      `https://management.azure.com/subscriptions/d0fc2d92-d09c-41d7-9815-7ca5ee3dc0c5/resourceGroups/RollandCharge/providers/Microsoft.CognitiveServices/accounts/llmtrainersearchservice/deployments/${DEPLOYMENT_NAME}?api-version=2024-10-01`,
      {
        sku: {
          name: 'Standard',
          capacity: 1,
        },
        properties: {
          model: {
            format: 'OpenAI',
            name: 'gpt-35-turbo-0613.ft-0752caba317841a4ab5e0c261794ae15-updated',
            version: '1',
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Deployment successful:', response.data);
  } catch (error) {
    console.error('Deployment error:', error.response ? error.response.data : error.message);
  }
}

deployModel();
