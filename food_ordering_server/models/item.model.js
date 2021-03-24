module.exports = (sequelize,Sequelize) =>{
	const Item = sequelize.define('items', {
		name : {
			type : Sequelize.STRING
		},
		price : {
			type : Sequelize.DECIMAL(10,2)
		},
		available_quantity : {
			type : Sequelize.INTEGER
		},
		non_veg : {
			type : Sequelize.STRING
		},
		description : {
			type : Sequelize.STRING
		},
		image_ref : {
			type : Sequelize.STRING
		}		
	});
	return Item;
}