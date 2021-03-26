module.exports = (sequelize,Sequelize) =>{
	const Address = sequelize.define('address', {
		id : {
			type: Sequelize.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		address_line_one : {
			type : Sequelize.STRING,
			allowNull : false
		},
		address_line_two : {
			type : Sequelize.STRING
		},
		name : {
			type : Sequelize.STRING,
			allowNull : false
		},
		contact_num : {
			type : Sequelize.STRING
		},
		pin_code : {
			type : Sequelize.INTEGER,
			allowNull : false
		},
		city : {
			type :Sequelize.STRING
		},
		state : {
			type :Sequelize.STRING
		}
	});
	return Address;
}