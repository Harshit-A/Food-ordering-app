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
			req.status(200).send({
				items : items
			});
		});
	}).catch(err =>{
		res.status(500).send({message : err.message});
	});
};