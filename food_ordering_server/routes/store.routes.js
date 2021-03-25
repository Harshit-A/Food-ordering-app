const express = require('express');
const router = express.Router();
const controller = require('../controllers/store.controller');
const {authMiddlewares} = require('../middleware');

router.get('/listStores', [authMiddlewares.verifyToken], controller.listStores);
router.get('/menu/:storeId',[authMiddlewares.verifyToken], controller.getMenu);

module.exports = router;