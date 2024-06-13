// Ejemplo en dataService.js
const likeModel = require('../models/likeModel');
const { logMensaje } = require('../utils/logger');

class LikeService {
    getAllLike(callback) {
        likeModel.getAllLike((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllLikeListado(callback) {
        likeModel.getAllLikeListado((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    async createLike(likeData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el like

        likeModel.createLike(likeData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    async updateLike(user_gmail, post_id, likeData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el like

        likeModel.updateLike(user_gmail, post_id, likeData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

	async getLikesOfUser(user_gmail,post_id, callback) {
		likeModel.getLikesOfUser(user_gmail,post_id, (err, result) => {
			if (err) {
				callback(err, null);
			} else {
				callback(null, result);
			}
		});
	}


    deleteLike(user_gmail, post_id, callback) {
        likeModel.deleteLike(user_gmail, post_id, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows); // Número de filas afectadas
            }
        });
    }


}

module.exports = new LikeService();
