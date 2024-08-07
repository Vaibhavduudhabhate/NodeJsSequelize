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
        },
        user_id : DataTypes.INTEGER
      },
      {
        sequelize, 
        tableName:'Contact'
        // modelName: 'User', 
      },
    );
return Contact;
}
// module.exports = Contact;