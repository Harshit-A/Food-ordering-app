module.exports = (sequelize,Sequelize) =>{
	const  Order = sequelize.define('orders' , {
		id : {
			type: Sequelize.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		payment_mode : {
			type : Sequelize.STRING,
			allowNull : false
		},
		discount_applied : {
			type : Sequelize.STRING,
			defaultValue : 'N'
		},
		discount_amount : {
			type : Sequelize.DECIMAL(10,2),
			default : 0.00
		},
		tax : {
			type : Sequelize.DECIMAL(10,2),
			defaultValue : 0.00
		},
		delivery_tax : {
			type : Sequelize.DECIMAL(10,2),
			defaultValue : 0.00
		},
		item_total : {
			type : Sequelize.DECIMAL(10,2),
			allowNull : false,
		},
		status : {
			type : Sequelize.STRING
		},
		order_close_time : {
			type : Sequelize.DATE,
			allowNull : false,
			defaultValue : Sequelize.NOW
		}
	});
	return Order;
}