const Sequelize = require('sequelize');

const sql = new Sequelize('tablero', 'root', 'LKMachine246', {
  host: 'localhost',
  dialect: 'mysql'
});

const Message = sql.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,    
  }
});

const Comment = sql.define('Comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Message.hasMany(Comment);
Comment.belongsTo(Message);

sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});  


module.exports = {

  Message,
  Comment
};