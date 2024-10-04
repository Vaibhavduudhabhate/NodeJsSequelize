const { Sequelize,DataTypes,Model } = require('sequelize');

const sequelize = new Sequelize('First', 'qwt_root', 'Dbs@11**', {
    host: 'localhost',
    logging:false,
    dialect: "mysql" 
  });

  try {
    sequelize.authenticate();
    sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {}
  db.sequelize = Sequelize;
  db.sequelize =sequelize;
  db.User =  require('./user')(sequelize,DataTypes,Model)
  db.Contact =  require('./contact')(sequelize,DataTypes,Model)

  // db.User.hasOne(db.Contact,{foreignKey:'user_id',as:"contact_details"})

  db.User.hasMany(db.Contact,{foreignKey:'user_id',as:"contact_details"})
  db.Contact.belongsTo(db.User,{foreignKey:'user_id',as:"user_details"})
  
  db.User.belongsToMany(db.Contact,{through:"user_contacts"})
  db.Contact.belongsToMany(db.User,{through:"user_contacts"})
  
    //  sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
     sequelize.sync({ force: true });
    //  sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
     
  
  module.exports = db;