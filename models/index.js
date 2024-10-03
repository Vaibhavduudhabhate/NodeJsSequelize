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

  db.User =  require('./user')(sequelize,DataTypes,Model)
  db.Contact =  require('./contact')(sequelize,DataTypes,Model)

  db.User.hasMany(db.Contact,{foreignKey:'user_id',as:"contact_details"})
  db.Contact.belongsTo(db.User)

  db.User.belongsToMany(db.Contact,{through:"user_contacts"})
  db.Contact.belongsToMany(db.User,{through:"user_contacts"})
  
  db.sequelize.sync({force : false})

  module.exports = db;