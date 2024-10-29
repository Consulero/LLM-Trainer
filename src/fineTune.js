const axios = require('axios');
const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION, AZURE_OPENAI_DEPLOYMENT } = require('./constants');

const fineTuneJob = async () => {
  try {
    const fineTuneParams = {
      model: 'gpt-35-turbo-0613.ft-acaad371be7f43589c32caba9d31b07f-rnc',
      training_file: 'file-feb84cb2225443a2abaf29a7cb71a4fc', // when upload to azure openai connection
      validation_file: null,
      hyperparameters: {
        n_epochs: 1,
        batch_size: 32,
      },
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
