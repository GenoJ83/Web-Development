const express = require('express');

const app = express();
const port = 8080;

function requestLogger(requestz, response, next){
    console,log(`Request Method: ${request.method}), URL:${request.url}`);
    next();
}
app.use(requestLogger); //
app.get('/', (req,res)=>{
    res.send('Hello World!');
})
app.listen(port,()=>{
    console.log(`the server is running on ${port}`)

})
