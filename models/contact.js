const { Model } = require("sequelize");


module.exports=(sequelize,DataTypes)=>{
    class Contact extends Model {}

    Contact.init(
      {
        permanant_address:{
            type:DataTypes.STRING,
            allowNull :false
        },
        current_address:{
            type :DataTypes.STRING
        }
    
      },
      {
        sequelize, 
        tableName:'Contact'
        // modelName: 'User', 
      },
    );
return Contact;
   
    
    // console.log('true or false',Contact === sequelize.model.Contact)
}
// module.exports = Contact;