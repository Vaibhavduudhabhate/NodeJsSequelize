const { Sequelize,DataTypes,Model } = require('sequelize');

const sequelize = new Sequelize('First', 'qwt_root', 'Dbs@11**', {
    host: 'localhost',
    logging:false,
    dialect: "mysql" 
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {}
  db.sequelize = Sequelize;
  db.sequelize =sequelize;

  db.Contact =  require('./contact')(sequelize,DataTypes)
  db.User =  require('./user')(sequelize,DataTypes,Model)
  db.sequelize.sync({force : true})

  module.exports = db;