const express = require('express');
var bodyParser = require('body-parser');

const app = express();

PORT = 3001;

app.use(bodyParser.json());

app.get('/',function (req,res){
    res.send('Hello world');
})

app.listen(PORT,()=>{
    console.log(`server is running on : http://localhost:${PORT}`);
});
