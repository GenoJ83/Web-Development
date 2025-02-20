const express = require('express');

const app = express();
const port = 8080;
// Logging Middleware function
function requestLogger(request, response, next){
    console.log(`Request method: ${request.method}, URL: ${request.url}`);
    next(); // Passing control to the next middleware/route handler
}
app.use(requestLogger); // Apply the middleware to all routes

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});

