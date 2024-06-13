// Ejemplo en likeModel.js
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class LikeModel {
    getAllLike(callback) {
        const query = 'SELECT * FROM likes';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllLikeListado(callback) {
        const query = 'SELECT u.* FROM likes u';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }


    getLikesOfUser(user_gmail, post_id, callback) {
        const query = 'SELECT like_value FROM likes WHERE user_gmail = ? AND post_id = ?';
		const values = [user_gmail, post_id];
        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, 0);
            } else {
                
                callback(null, result[0].like_value);
            }
        });
    }

    // getLikeByIdRelations(likeId, callback) {
    //     const query = 'SELECT c.*,t.reservation,t.descripcion as reservationdesc FROM likes as c, reservation as t WHERE c.idreservation = t.idreservation AND idlike = ?';
    //     db.query(query, [likeId], (err, result) => {
    //         if (err) {
    //             logErrorSQL(err);
    //             callback(err, null);
    //         } else if (result.length === 0) {
    //             callback(null, null);
    //         } else {
    //             const like = result[0];
    //             callback(null, like);
    //         }
    //     });
    // }

    async createLike(likeData,callback) {
        // Atencion, idlike es PK y es Auto Incremental, se pone como null
        const query = 'INSERT INTO likes (user_gmail, post_id, like_value) VALUES (?, ?, ?)';
        const values = [likeData.user_gmail, likeData.post_id, likeData.like_value];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    async updateLike(user_gmail, post_id, likeData, callback) {
        // Atencion, idlike es PK y es Auto Incremental, se pone como null
        const query = 'UPDATE likes SET like_value = ? WHERE user_gmail = ? AND post_id = ?;';
        const values = [likeData.like_value, user_gmail, post_id];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteLike(user_gmail, post_id, callback) {
        const query = 'DELETE FROM likes WHERE user_gmail = ? AND post_id = ?';
        const values = [user_gmail, post_id];

        db.query(query, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
}

module.exports = new LikeModel();

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

