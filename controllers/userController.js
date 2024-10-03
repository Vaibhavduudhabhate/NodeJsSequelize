const db = require("../models");
// const { userService } = require("../services/userServices");
const User = db.User ;
const Contact = db.Contact;

var adduser = async(req,res)=>{
  console.log(req.body)
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

var pagination = async(req,res)=>{
    const data = await User.findAll({})
    // res.status(200).json({data:data})
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {};
    
    results.results = data.slice(startIndex, endIndex);
    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }


    res.json(results);
}

const userList = async (req, res, next) => {  
    try {  
      let offsetNo;
      let pgeno = req.query.page == undefined ? 1 : req.query.page;
      pgeno = Number(pgeno); // making it a numeric value
      console.log('pgeno',pgeno)
  
      const allcount = await User.count({});
        console.log('allcount',allcount)
      const filteredRecordCount = await User.count({
        paranoid: true,
      });
      console.log('filteredRecordCount',filteredRecordCount)
      let total_pages = Math.ceil(filteredRecordCount / 10);
      console.log('total_pages',total_pages)
      if (filteredRecordCount == 0) {
        console.log("entered")
        return res.status(200).json({
          data: [],
          message: "No records found ",
          success: true,
        });
      } else {
        console.log("entered else")
        if (pgeno == 0) {
          pgeno = 1;
          offsetNo = 0;
        } else if (pgeno == total_pages) {
          offsetNo = 10 * (total_pages - 1);
        } else if (pgeno == 1) {
          offsetNo = 0;
        } else {
          offsetNo = 10 * (pgeno - 1);
        }
      }
  
      const { rows,count } = await User.findAndCountAll({
        limit:10,
        // where: condition,
        paranoid: true,
        offset: offsetNo,
        // attributes: {
        //   exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
        // },
        // include: [
        //   {
        //     model: Charities,
        //     // paranoid: false,
  
        //     as: "charities",
        //     attributes: ["charity_name"],
        //     // Specify the columns you want from the charity model
        //   },
        // ],
        // order: [["createdAt", "DESC"]],
      });
  
      let nxtpgeno = pgeno + 1;
      let prepgeno = pgeno - 1;
  
      if (rows.length == 0) {
        return res.status(200).json({
          data: [],
          message: "No records found ",
          success: true,
        });
      }
  
      if (rows.length > 10) {
        if (pgeno == 1) {
          return res.status(200).json({
            data: rows,
            success: true,
            record_count: filteredRecordCount,
            current_page: pgeno,
            next_page: nxtpgeno,
            total_page: total_pages,
            total_records: allcount,
          });
        }
      } else {
        if (pgeno == 1) {
          return res.status(200).json({
            data: rows,
            success: true,
            record_count: filteredRecordCount,
            current_page: pgeno,
            total_page: total_pages,
            total_records: allcount,
          });
        }
      }
  
      if (pgeno == total_pages) {
        return res.status(200).json({
          data: rows,
          success: true,
          record_count: filteredRecordCount,
          current_page: pgeno,
          previous_page: prepgeno,
          total_page: total_pages,
          total_records: allcount,
        });
      }
      return res.status(200).json({
        data: rows,
        success: true,
        current_page: pgeno,
        previous_page: prepgeno,
        next_page: nxtpgeno,
        total_page: total_pages,
        total_records: allcount,
        record_count: filteredRecordCount,
      });
    } catch {
      (err) => {
        next(err);
      };
    }
  };
  

// var paginateUser = {findAll: async(req ,res,next) =>{
//        try {
//             const {page=1,limit=3,keyword} = req.query

//             const data = await userService.findAll({
//                 page :+page?page:1,
//                 limit :+limit?limit:1,
//                 keyword
//             })
//             res.status(200).json({data:data})
//        } catch (error) {
//             next(error)
//        }
// }}


var association = async(req,res)=>{
  res.send('hello world');
}

var oneToOneUser = async(req,res)=>{

  // var data = await User.create({first_name:"rahul",last_name:"yadav"})
  console.log(req.body)
    // try {
    //     const { first_name, last_name } = req.body;

    //     const data = await User.create({
    //         first_name,
    //         last_name
    //       });
          
    //       if(data && data.id){
    //         await db.Contact.create({permanant_address:"xyz",current_address:"abc",user_id:data.id});
    //       }
    //     console.log('New user created:', data.toJSON());
    //     res.status(200).json({data:data});
    //     // res.status(200).json({data:data})
    // } catch (error) {
    //     console.error('Error creating new user:', error);
    //     res.status(500).json({ error: 'Failed to add new user' });
    // }

    var data = await User.findAll({
      attributes:["first_name","last_name"],
      include :[{
        model:Contact,
        as:"contact_details",
        attributes:["permanant_address","current_address","user_id"]

      }] 
    })
    res.status(200).json({data:data})
}

var oneToManyUser = async(req,res)=>{

  // var data = await db.Contact.create({permanant_address:"pqr",current_address:"lmn",user_id:1})
  // console.log(req.body)
    // try {
    //     const { first_name, last_name } = req.body;

    //     const data = await User.create({
    //         first_name,
    //         last_name
    //       });
          
    //       if(data && data.id){
    //         await db.Contact.create({permanant_address:"xyz",current_address:"abc",user_id:data.id});
    //       }
    //     console.log('New user created:', data.toJSON());
    //     res.status(200).json({data:data});
    //     // res.status(200).json({data:data})
    // } catch (error) {
    //     console.error('Error creating new user:', error);
    //     res.status(500).json({ error: 'Failed to add new user' });
    // }

    var data = await User.findAll({
      attributes:["first_name","last_name"],
      include :[{
        model:Contact,
        as:"contact_details",
        attributes:["permanant_address","current_address","user_id"]

      }],
      where:{id:1} 
    })
    res.status(200).json({data:data})
}

module.exports = {
    adduser,getallusers,getuser,postusers,deleteuser,patchuser,pagination,userList,association,oneToOneUser,oneToManyUser
}
