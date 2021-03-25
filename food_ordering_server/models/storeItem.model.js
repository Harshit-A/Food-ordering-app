module.exports = (sequelize,Sequelize) =>{
	const StoreItem = sequelize.define('store_items', {
		is_available : {
			type: Sequelize.STRING
		}
	});
	return StoreItem;
}