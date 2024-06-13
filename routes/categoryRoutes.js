// categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

router.get('/', categoryController.getAllCategory);

module.exports = router;
