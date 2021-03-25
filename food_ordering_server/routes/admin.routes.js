const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');

//TO_DO: add middleware to control access
router.get('/items', storeController.getItems);
router.post('/addItems/:storeId', storeController.addItemsToStore)
module.exports = router;

