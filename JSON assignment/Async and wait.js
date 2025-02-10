const fs = require('fs').promises;
const path = 'sample1.json';

async function fetchDataAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log('Async/Await Data from JSON file:', jsonData);
  } catch (error) {
    console.error(`Error reading or parsing file: ${error}`);
  }
}

// Usage
fetchDataAsync('sample1.json');
