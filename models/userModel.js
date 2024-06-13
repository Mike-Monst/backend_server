// Ejemplo en userModel.js
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class UserModel {
    getAllUser(callback) {
        const query = 'SELECT * FROM user';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllUserListado(callback) {
        const query = 'SELECT u.* FROM user u';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }


    getUserById(userId, callback) {
        const query = 'SELECT * FROM user WHERE gmail = ?';
        db.query(query, [userId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const user = result[0];
                callback(null, user);
            }
        });
    }

    getUserByIdRelations(userId, callback) {
        const query = 'SELECT c.*,t.reservation,t.descripcion as reservationdesc FROM user as c, reservation as t WHERE c.idreservation = t.idreservation AND iduser = ?';
        db.query(query, [userId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const user = result[0];
                callback(null, user);
            }
        });
    }

    async createUser(userData,callback) {
        // Atencion, iduser es PK y es Auto Incremental, se pone como null
        const query = 'INSERT INTO user (gmail, nickname, password) VALUES (?, ?, ?)';
        const values = [userData.gmail, userData.nickname, userData.password];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    
    async updateUser(userId, userData, callback) {
        // Atencion, iduser es PK y es Auto Incremental, se pone como null
        const query = 'UPDATE user SET gmail = ? ,nickname = ?, WHERE password = ?;';        
        
        const values = [userData.gmail, userData.nickname, userData.password];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteUser(userId, callback) {
        const query = 'DELETE FROM user WHERE gmail = ?';
        db.query(query, [userId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
}

module.exports = new UserModel();

// Estructura de result (mysql)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Número de filas afectadas por la consulta
//   insertId: 1,    // ID generado por la operación de inserción
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0  // Número de filas cambiadas por la consulta
// }

