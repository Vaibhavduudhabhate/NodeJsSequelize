const db = require("../models");
const User = db.User ;

var adduser = async(req,res)=>{
    try {
        const { first_name, last_name } = req.body;

        const newUser = await User.create({
            first_name,
            last_name
        });

        console.log('New user created:', newUser.toJSON());
        res.status(200).json(newUser.toJSON());
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ error: 'Failed to add new user' });
    }


    // const jane = await User.create({first_name :'john',last_name:"doe"})
    // // const jane = User.build({first_name :'jane',last_name:"doe"})
    // console.log(jane instanceof User);
    // console.log(jane.first_name ,jane.last_name);
    // await jane.update({first_name :'john11',last_name:"doe11"})
    // await jane.save();
    // // await jane.destroy({first_name :'john',last_name:"doe"})
    // console.log('john was saved to database')
    // console.log(jane.toJSON());
    // res.status(200).json(jane.toJSON())
}

var getallusers = async(req,res)=>{
    const data = await User.findAll({})
    res.status(200).json({data:data})
}

var getuser = async(req,res)=>{
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    })
    res.status(200).json({data:data})
}

var postusers = async(req,res)=>{
    var postData = req.body;
    console.log(postData)
    if(Array.isArray(postData)){
        data = await User.bulkCreate(postData);
    }else{
        var data = await User.create({
            first_name: postData.first_name,
            last_name: postData.last_name
        })
    }
    res.status(200).json({data:data})
}

var deleteuser = async(req,res)=>{
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    })
    res.status(200).json({data:data})
}

var patchuser = async(req,res)=>{
    let updatedData = req.body;
    const data = await User.update(updatedData,{
        where:{
            id:req.params.id
        }
    })
    res.status(200).json({data:data})
}



module.exports = {
    adduser,getallusers,getuser,postusers,deleteuser,patchuser
}
