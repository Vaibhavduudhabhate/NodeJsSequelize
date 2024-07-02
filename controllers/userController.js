const db = require("../models");
const User = db.User ;

var adduser = async(req,res)=>{
    const jane = User.build({first_name :'jane',last_name:"doe"})
    console.log(jane instanceof User);
    console.log(jane.first_name ,jane.last_name);
    await jane.save();
    console.log('jane was saved to database')
    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON())
}
module.exports = {
    adduser
}
