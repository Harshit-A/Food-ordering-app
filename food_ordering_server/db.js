//db configs import
// var mysql = require('mysql');


// var db_config = require('./configs/db_configs')[env];

// var pool = mysql.createPool({
// 	connectionLimit : 10,
// 	host : db_config.host,
// 	user : db_config.user,
// 	password : db_config.password,
// 	database : db_config.database,
// 	debug : db_config.debug
// });
// module.exports = pool;
const env = process.env.NODE_ENV || 'development'
const configs = require('./configs/db_configs')[env];
const Sequelize  = require('sequelize'); 

const sequelize = new Sequelize(
	configs.database,
	configs.user,
	configs.password,
		{
			host : configs.host,
			dialect : configs.dialect,
			pool :{
				max : 10,
				min : 0,
				aquire : 30000,
				idle : 10000
			}
		}
	);
//testing the db conneciton
sequelize.authenticate()
	.then(() =>{
		console.log('DB Connections established successfully')
	})
	.catch(err =>{
		console.error('Unable to connect to DB', err)
	});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./models/user.model')(sequelize, Sequelize);
db.role = require('./models/role.model')(sequelize, Sequelize);

//create many-to-many relationship between users and roles

db.role.belongsToMany(db.user,{
	through : 'user_roles',
	foreignKey : 'roleId',
	otherKey : 'userId'
});
db.user.belongsToMany(db.role,{
	through : 'user_roles',
	foreignKey : 'userId',
	otherKey : 'roleId'
});


module.exports = db;