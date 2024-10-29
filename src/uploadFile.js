const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION, AZURE_OPENAI_DEPLOYMENT } = require('./constants');

const uploadFileForFineTune = async () => {
  try {
    const form = new FormData();

    form.append('purpose', 'fine-tune');
    const sourcePath = '.\\destination-pdf\\output.jsonl';
    form.append('file', fs.createReadStream(sourcePath));

    const response = await axios.post(`${AZURE_OPENAI_ENDPOINT}/openai/files?api-version=${AZURE_OPENAI_API_VERSION}`, form, {
      headers: {
        'api-key': AZURE_OPENAI_API_KEY,
        ...form.getHeaders(),
      },
    });

    console.log('File upload response:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

uploadFileForFineTune();
