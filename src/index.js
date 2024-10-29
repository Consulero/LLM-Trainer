const fs = require('fs');
const pdf = require('pdf-parse');
const { chatComplition } = require('./chat');
const { generateJsonlFile } = require('./formatFile');

async function parsePDF() {
  try {
    // const pdfPath = '.\\source-pdf\\adding and removing keys.pdf';
    const files = await fs.promises.readdir('.\\source-pdf');
    console.log("Uploaded Files are:",files);

    for (let index = 0; index < files.length; index++) {
      const fileName = files[index];

      const pdfPath = `.\\source-pdf\\${fileName}`;
      let dataBuffer = fs.readFileSync(pdfPath);
      let data = await pdf(dataBuffer);

      const jsonlData = await chatComplition(data.text, 'tesla model Y'); // write the logic to store dataset available in array of json

      let qaDataSet;
      if (!Array.isArray(jsonlData)) {
        qaDataSet = JSON.parse(jsonlData);
      }
      await generateJsonlFile(qaDataSet, '.\\destination-pdf\\output.jsonl', 'This is a chatbot for Electric Cars repair guidance.');
    }
  } catch (error) {
    console.log('Error:==>', error);
  }
}

parsePDF();
