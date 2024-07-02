const express = require('express');
var bodyParser = require('body-parser');
// const User = require('./models/user');
// const Contact = require('./models/contact');
var userCtrl = require('./controllers/userController')
require('./models')
const app = express();

PORT = 3001;

app.use(bodyParser.json());

app.get('/',function (req,res){
    res.send('Hello world');
})
app.get('/add',userCtrl.adduser)

// User.sync();
// Contact.sync()
// User.sync({force : true});
// Contact.sync({force:true})

app.listen(PORT,()=>{
    console.log(`server is running on : http://localhost:${PORT}`);
});
