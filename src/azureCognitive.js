const { AZURE_COGNITIVE_API_VERSION, AZURE_SEARCH_INDEX_NAME, AZURE_SEARCH_SERVICE_NAME, AZURE_COGNITIVE_SEARCH_API_KEY } = require('./constants');
const axios = require('axios');

module.exports = {
  async queryAzureSearch(queryTerm) {
    try {
      const response = await axios.post(
        `https://${AZURE_SEARCH_SERVICE_NAME}.search.windows.net/indexes/${AZURE_SEARCH_INDEX_NAME}/docs/search?api-version=${AZURE_COGNITIVE_API_VERSION}`,
        {
          search: queryTerm,
          top: 3, // Limit to top 3 results
          select: 'content', // index fields like 'content,title,url,filepath'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_COGNITIVE_SEARCH_API_KEY,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error querying Azure Search:', error.response?.data || error.message);
      throw error;
    }
  },
};
