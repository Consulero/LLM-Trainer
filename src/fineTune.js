const axios = require('axios');
const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION, AZURE_OPENAI_DEPLOYMENT } = require('./constants');

const fineTuneJob = async () => {
  try {
    const fineTuneParams = {
      model: 'gpt-4o-2024-08-06.ft-e77ee82925a54ad1a0f49f62521a8bd7-tesla_three',
      training_file: 'file-6b7bc7c100f446ab832a242352e2e260', // when upload to azure openai connection
      suffix: 'tesla_s', //change accordingly for each model
      validation_file: null, // optional
      hyperparameters: null, // will use default
    };

    const response = await axios.post(`${AZURE_OPENAI_ENDPOINT}/openai/fine_tuning/jobs?api-version=${AZURE_OPENAI_API_VERSION}`, fineTuneParams, {
      headers: {
        'api-key': AZURE_OPENAI_API_KEY,
      },
    });

    console.log('Fine Tune response:', response.data);
  } catch (error) {
    console.error('Error on Fine Tune:', error);
  }
};

fineTuneJob();
