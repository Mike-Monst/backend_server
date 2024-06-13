// Ejemplo en dataService.js
const userModel = require('../models/userModel');
const { logMensaje } = require('../utils/logger');

class UserService {
    getAllUser(callback) {
        userModel.getAllUser((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllUserListado(callback) {
        userModel.getAllUserListado((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    async createUser(userData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el user

        userModel.createUser(userData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    async updateUser(userId, userData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el user

        userModel.updateUser(userId, userData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getUserById(userId, callback) {

        userModel.getUserById(userId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getUserByIdRelations(userId, callback) {

        userModel.getUserByIdRelations(userId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteUser(userId, callback) {
        userModel.deleteUser(userId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows); // Número de filas afectadas
            }
        });
    }


    // Otros métodos del servicio...
}

module.exports = new UserService();
