const express = require('express');
var bodyParser = require('body-parser');
// const User = require('./models/user');
// const Contact = require('./models/contact');
var userCtrl = require('./controllers/userController')
// var paginateUser = require("./controllers/userController")
require('./models')
const app = express();
app.use(express.json());
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  
  app.use(
    express.urlencoded({
      extended: false, 
      // limit: "200mb",
    })
  );
  
  app.use(bodyParser.json());
  const cors = require("cors");
  app.use(cors(corsOptions));
//   const bodyParser = require("body-parser");

PORT = 3001;

app.use(bodyParser.json());

app.get('/',function (req,res){
    res.send('Hello world');
})
app.post('/add',userCtrl.adduser);
app.get('/users',userCtrl.getallusers)
app.get('/user/:id',userCtrl.getuser)

app.post('/users',userCtrl.postusers)
app.delete('/user/:id',userCtrl.deleteuser)
app.patch('/user/:id',userCtrl.patchuser)

app.get('/pagin',userCtrl.pagination)
app.get('/pagination',userCtrl.userList)

app.get('/associatons',userCtrl.association)
app.get('/one-to-one',userCtrl.oneToOneUser);
app.get('/one-to-many',userCtrl.oneToManyUser);


// User.sync();
// Contact.sync()
// User.sync({force : true});
// Contact.sync({force:true})

app.listen(PORT,()=>{
    console.log(`server is running on : http://localhost:${PORT}`);
});
