const db = require('../db');
const Store = db.store;
const Item = db.item;

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

