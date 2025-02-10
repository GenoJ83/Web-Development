const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const jsonFilePath = path.join(__dirname, 'data.json');

// Callback-based endpoint
app.get('/data/callback', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Error reading file: ${err.message}` });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      res.status(500).json({ error: `Error parsing JSON: ${parseErr.message}` });
    }
  });
});

// Promise-based endpoint
app.get('/data/promise', (req, res) => {
  fsPromises.readFile(jsonFilePath, 'utf8')
    .then(data => res.json(JSON.parse(data)))
    .catch(err => res.status(500).json({ error: `Error reading or parsing file: ${err.message}` }));
});

// Async/Await-based endpoint
app.get('/data/async', async (req, res) => {
  try {
    const data = await fsPromises.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: `Error reading or parsing file: ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
