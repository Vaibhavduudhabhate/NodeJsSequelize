const { Model } = require("sequelize");


module.exports=(sequelize,DataTypes)=>{
    class User extends Model {}

    User.init(
      {
        first_name:{
            type:DataTypes.STRING,
            allowNull :false
        },
        last_name:{
            type :DataTypes.STRING
        }
    
      },
      {
        sequelize, 
        tableName:'First'
        // modelName: 'User', // We need to choose the model name
      },
    );
return User;
    // const Contact = sequelize.define('Contact',{
    //     permanant_address:{
    //         type:DataTypes.STRING,
    //         allowNull :false
    //     },
    //     current_address:{
    //         type :DataTypes.STRING
    //     }
    
    // },{
    //     tableName:'Contact'
    // })
    
    // console.log('true or false',User === sequelize.model.User)
}
// module.exports = Contact;