// Ejemplo en categoryModel.js
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class CategoryModel {
    getAllCategory(callback) {
        const query = 'SELECT Type FROM categoria';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new CategoryModel();