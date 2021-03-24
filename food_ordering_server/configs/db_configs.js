var config = {
	development:{
		host : '127.0.0.1',
		user : 'root',
		password : 'harshit26',
		database : 'test_db',
		debug : true,
		dialect : 'mysql'
	},
	production : {
		host :'',
		user : '',
		password : process.env.DB_PWD,
		database : '',
		debug : false,
		dialect : 'mysql'

	}

};
module.exports = config;