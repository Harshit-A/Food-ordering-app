module.exports = (sequelize,Sequelize) =>{
	const User = sequelize.define('users',{
		name : {
			type : Sequelize.STRING
		},
		email_id : {
			type :Sequelize.STRING
		},
		password : {
			type : Sequelize.STRING
		},
		contact_number : {
			type : Sequelize.STRING
		},
		gender : {
			type: Sequelize.STRING
		},
		age : {
			type : Sequelize.INTEGER
		}
	});
	return User;
}