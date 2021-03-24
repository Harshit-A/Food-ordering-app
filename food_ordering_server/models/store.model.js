module.exports = (sequelize, Sequelize) =>{
	const Store = sequelize.define('stores',{
		name:{
			type : Sequelize.STRING
		},
		contact_number : {
			type: Sequelize.STRING
		},
		address : {
			type : Sequelize.STRING
		},
		city : {
			type : Sequelize.STRING
		},
		state : {
			type : Sequelize.STRING
		},
		pincode : {
			type : Sequelize.STRING
		}
	});
	return Store;
}