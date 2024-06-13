// Ejemplo en dataService.js
const categoryModel = require('../models/categoryModel');
const { logMensaje } = require('../utils/logger');

class CategoryService {
    getAllCategory(callback) {
        categoryModel.getAllCategory((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}

module.exports = new CategoryService();
