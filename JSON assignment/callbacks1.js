const fs = require('fs');
const path = 'sample1.json';

function fetchDataCallback(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(`Error reading file: ${err}`, null);
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (parseErr) {
        callback(`Error parsing JSON: ${parseErr}`, null);
      }
    }
  });
}

// Usage
const jsonFilePath = 'sample1.json';

fetchDataCallback(jsonFilePath, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Callback Data from JSON file:', data.fear);
  }
});
