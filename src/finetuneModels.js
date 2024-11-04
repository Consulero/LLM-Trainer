const axios = require('axios');
const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION, AZURE_OPENAI_DEPLOYMENT } = require('./constants');

const listFinetuneModels = async () => {
  try {
    const response = await axios.get(`${AZURE_OPENAI_ENDPOINT}/openai/fine_tuning/jobs?api-version=2024-06-01`, {
      headers: {
        'api-key': AZURE_OPENAI_API_KEY,
      },
    });

    console.log('Fine Tune Modelsresponse:', response.data);
  } catch (error) {
    console.error('Error on Fine Tune:', error);
  }
};

listFinetuneModels();
