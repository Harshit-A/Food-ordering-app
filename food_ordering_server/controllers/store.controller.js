const db = require('../db');
const Store = db.store;
const Item = db.item;
const StoreItem = db.storeItem;
const operators = db.Sequelize.Op;

exports.listStores = (req,res)=>{
	Store.findAll({}).then(stores =>{
		res.status(200).send({
			stores: stores
		});
	}).catch(err=>{
		res.status(500).send({message : err,message});
	});
};

exports.getMenu = (req,res) =>{
	Store.findOne({
		where :{
			id : req.params.storeId
		}
	}).then(store=>{
		store.getItems().then(items =>{
			res.status(200).send({
				items : items
			});
		});
	}).catch(err =>{
		res.status(500).send({message : err.message});
	});
};


exports.getItems = (req,res) =>{
	Item.findAll({}).then(items =>{
		res.status(200).send({items : items});
	}).catch(err =>{
		res.status(500).send({message : err.message});	
	});
};

exports.addItemsToStore = (req,res) =>{
	Store.findOne({
		where : {
			id : req.params.storeId
		}
	}).then(store =>{
		if(!store)
		{
			return res.status(404).send({message : 'Store not found!'});
		}
		itemIds = req.body.items.split(',');
		store.addItems(itemIds, {through : {is_available : 'Y'}})
	}).then((err,result)=>{
		if(err)
			res.status(500).send({message : err.message});
		res.status(200).send({message : 'Items have been added to store'});
	}).catch(err =>{
		res.status(500).send({message : err.message});	
	});
};

exports.updateItemAvailability =  (req,res) =>{
	itemsWithAvailabilityN = [];
	if(req.body.itemsWithAvailabilityN)
		itemsWithAvailabilityN = req.body.itemsWithAvailabilityN.split(',');
	itemsWithAvailabilityY = [];
	if(req.body.itemsWithAvailabilityY)
	 	itemsWithAvailabilityY = req.body.itemsWithAvailabilityY.split(',');
 
	StoreItem.update(
		{ is_available : 'Y'},
		{ where : {
			storeId  : req.params.storeId,
			itemId : itemsWithAvailabilityY
	}})
	.catch(err =>{
		res.status(500).send({message : err.message});
	}).then(()=>{
		StoreItem.update(
		{ is_available : 'N'},
		{ where : {
			storeId  : req.params.storeId,
			itemId : itemsWithAvailabilityN
		}})
		.catch(err =>{
			res.status(500).send({message : err.message});
		});	
	}).then(()=>{
		res.status(200).send({message : 'Items have been updated'});
	});	
};

exports.deleteItemFromStore = (req,res) =>{
	const itemIds = req.body.itemId.split(',');
	StoreItem.destroy({
		where: {
			storeId : req.params.storeId,
			itemId : itemIds
		}
	}).catch(err=>{
		res.status(500).send({message : err.msg});
	}).then(()=>{
		res.status(200).send({message : 'Items have been deleted'});
	});
};

exports.deleteItems = (req,res) =>{
	const itemIds = req.body.itemId.split(',');
	StoreItem.destroy({
		where :{
			itemId : itemIds
		}
	}).then(() =>{
		Item.destroy({
			where : {
				id : itemIds
			}
		})
	}).then(() =>{
		res.status(200).send({message: 'Items have been deleted from all stores'});
	}).catch(err=>{
		res.status(500).send({message : err.message});
	});
};

exports.deleteStores = (req,res) =>{
	const storeIds = req.body.storeId.split(',');
	StoreItem.destroy({
		where : {
			storeId : storeIds
		}
	}).then(() =>{
		Store.destroy({
			where : {
				id : storeIds
			}
		})
	}).then(() =>{
		res.status(200).send({message : 'Stores have been deleted'});
	}).catch(err =>{
		res.status(500).send({message : err.msg});
	});
};
