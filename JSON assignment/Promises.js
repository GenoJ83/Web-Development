const fs = require('fs').promises;
const path = 'sample1.json';

function fetchDataPromise(filePath) {
  return fs.readFile(filePath, 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => {
      throw new Error(`Error reading or parsing file: ${err}`);
    });
}

// Usage
const jsonFilePath = path.join(__dirname, 'data.json');

fetchDataPromise(jsonFilePath)
  .then(data => console.log('Promise Data from JSON file:', data))
  .catch(err => console.error(err));
