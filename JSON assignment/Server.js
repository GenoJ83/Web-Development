const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const jsonFilePath = path.join(__dirname, 'sample1.json');

// Callback-based fetch
app.get('/data/callback', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return res.status(500).json({ error: `Error reading file: ${err.message}` });
    }
    try {
      const jsonData = JSON.parse(data);
      console.log('Callback Data:', jsonData);
      res.json(jsonData);
    } catch (parseErr) {
      console.error(`Error parsing JSON: ${parseErr.message}`);
      res.status(500).json({ error: `Error parsing JSON: ${parseErr.message}` });
    }
  });
});

// Promise-based fetch
app.get('/data/promise', (req, res) => {
  fsPromises.readFile(jsonFilePath, 'utf8')
    .then(data => {
      const jsonData = JSON.parse(data);
      console.log('Promise Data:', jsonData);
      res.json(jsonData);
    })
    .catch(err => {
      console.error(`Error reading or parsing file: ${err.message}`);
      res.status(500).json({ error: `Error reading or parsing file: ${err.message}` });
    });
});

// Async/Await-based fetch
app.get('/data/async', async (req, res) => {
  try {
    const data = await fsPromises.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log('Async/Await Data:', jsonData);
    res.json(jsonData);
  } catch (error) {
    console.error(`Error reading or parsing file: ${error.message}`);
    res.status(500).json({ error: `Error reading or parsing file: ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
