const fs = require('fs').promises;
const path = require('path');

module.exports = {
  async generateJsonlFile(dataArray, fileName, systemMessage) {
    try {
      const jsonlContent = dataArray
        .map((item) => {
          return JSON.stringify({
            messages: [
              { role: 'system', content: systemMessage },
              { role: 'user', content: item.question },
              { role: 'assistant', content: item.answer },
            ],
          });
        })
        .join('\n');

      // Check if the file exists
      const filePath = path.resolve(fileName);
      try {
        await fs.access(filePath); // If the file exists, this will succeed
        await fs.appendFile(filePath, '\n' + jsonlContent); // Add newline before appending
      } catch (err) {
        await fs.writeFile(filePath, jsonlContent);
      }
    } catch (error) {
      console.error('Error generating JSONL file:', error);
    }
  },
};
