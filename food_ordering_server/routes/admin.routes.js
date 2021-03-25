const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');

//TO_DO: add middleware to control access
router.get('/items', storeController.getItems);
router.post('/addItems/:storeId', storeController.addItemsToStore)
router.post('/:storeId/updateItem', storeController.updateItemAvailability);
router.post('/:storeId/deleteItem', storeController.deleteItemFromStore);
router.post('/deleteItem', storeController.deleteItems);
router.post('/deleteStore', storeController.deleteStores);

module.exports = router;

