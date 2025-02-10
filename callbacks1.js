const fs = require('fs');
const path = require('sample1.json');

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
const jsonFilePath = path.join(__dirname, 'data.json');

fetchDataCallback(jsonFilePath, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Callback Data from JSON file:', data);
  }
});
