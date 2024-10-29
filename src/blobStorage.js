const fs = require('fs');
const path = require('path');
const { BlobServiceClient } = require('@azure/storage-blob');
const { AZURE_STORAGE_CONNECTION_STRING, CONTAINER_NAME } = require('./constants');

async function uploadPDF(filePath) {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    await containerClient.createIfNotExists();

    const blobName = path.basename(filePath);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const fileBuffer = fs.readFileSync(filePath);

    const uploadBlobResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    console.log('uploadBlobResponse', uploadBlobResponse);
    console.log(`Upload complete. Blob URL: ${blockBlobClient.url}`);
  } catch (error) {
    console.error('Error uploading PDF to Azure Blob Storage:', error.message);
  }
}

const pdfFilePath = '.\\blob\\<your_pdf_file_name.pdf>';
uploadPDF(pdfFilePath);
