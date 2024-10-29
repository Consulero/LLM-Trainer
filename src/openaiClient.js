const {
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_API_VERSION,
  AZURE_OPENAI_DEPLOYMENT,
} = require('./constants');
const { AzureOpenAI } = require('openai');

module.exports = {
  getOpenaiClient() {
    const client = new AzureOpenAI({
      AZURE_OPENAI_ENDPOINT,
      AZURE_OPENAI_API_KEY,
      apiVersion: AZURE_OPENAI_API_VERSION,
      deployment: AZURE_OPENAI_DEPLOYMENT,
    });

    return client;
  },
};
