const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const {authMiddlewares} = require('../middleware');

router.post('/signUp',[authMiddlewares.checkDuplicateEmail], controller.signUp);
router.post('/signIn', controller.signIn);

module.exports = router;