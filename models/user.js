const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define('First',{
    firstName:{
        type:DataTypes.STRING,
        allowNull :false
    },
    lastName:{
        type :DataTypes.STRING
    }

},{
    tableName:'First'
})

// console.log(User === sequelize.model.User)