// likeController.js
const likeService = require("../services/likeService.js");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class LikeController {
	async getAllLike(req, res) {
		// Recuperar información de los parámetros de la petición
		const { listado } = req.query;

		// Si se trata de un listado (existe el parámetro listado), invoco otro servicio
		if (listado) {
			likeService.getAllLikeListado((err, data) => {
				if (err) {
					res
						.status(500)
						.json(
							Respuesta.error(
								data,
								"Error al recuperar los datos:" + req.originalUrl
							)
						);
				} else {
					res.json(Respuesta.exito(data, "Listado de likes recuperado"));
				}
			});
		} else {
			// No se trata de un listado
			// Implementa la lógica para obtener todos los datos
			likeService.getAllLike((err, data) => {
				if (err) {
					res
						.status(500)
						.json(
							Respuesta.error(
								data,
								"Error al recuperar los datos:" + req.originalUrl
							)
						);
				} else {
					res.json(Respuesta.exito(data, "Datos de likes recuperados"));
				}
			});
		}
	}

	

	async getLikesById(req, res) {
		// Implementa la lógica para obtener un dato por ID
		// Recuperar información que vienen en la ruta '/:id'
		const reqIndex = req.params.id.indexOf('&');

		// Si no se encuentra el &, devolver el string original
		if (reqIndex === -1) {
		  // solo busca numero de likes
		}else{
			// busca like de post por el like
			const user_gmail = req.params.id.substring(0, reqIndex);
			const post_id = req.params.id.substring(reqIndex + 1);

		// No necesito recuperar datos relacionados

		// Implementa la lógica para obtener el like
		likeService.getLikesOfUser(user_gmail,post_id, (err, like) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(
							like,
							"Error al recuperar los datos:" + req.originalUrl
						)
					);
			} else if (like == null) {
				res
					.status(404)
					.json(Respuesta.error(like, "Like no encontrado: " + userId));
			} else {
				res.json(Respuesta.exito(like, "Like recuperado"));
			}
		});
		}
		
	}

	async createLike(req, res) {
		const likeData = req.body;

		likeService.createLike(likeData, (err, result) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(
							result,
							"Error al insertar el like:" + req.originalUrl
						)
					);
			} else {
				// 201: Created
				res
					.status(201)
					.json(
						Respuesta.exito({ insertId: result.insertId }, "Like dado de alta")
					);
			}
		});
	}

	async updateLike(req, res) {
		const reqIndex = req.params.id.indexOf('&');
		const user_gmail = req.params.id.substring(0, reqIndex);
		const post_id = req.params.id.substring(reqIndex + 1);

		const likeData = req.body;

		// Implementa la lógica para eliminar el like
		likeService.updateLike(user_gmail, post_id, likeData, (err, result) => {
			if (err) {
				console.error("Error al modificar el like:", err);
				res.status(500).json({ error: "Error interno del servidor" });
				// } else if (result === 0) {
				//     res.status(404).json({ error: 'Like no encontrado' });
			} else {
				res
					.status(201)
					.json(
						Respuesta.exito({ insertId: result.insertId }, "Like modificado")
					);
			}
		});
	}

	async deleteLike(req, res) {
		const reqIndex = req.params.id.indexOf('&');
		const user_gmail = req.params.id.substring(0, reqIndex);
		const post_id = req.params.id.substring(reqIndex + 1);

		// Implementa la lógica para eliminar el like
		likeService.deleteLike(user_gmail, post_id, (err, result) => {
			if (err) {
				console.error("Error al eliminar like:", err);
				res.status(500).json({ error: "Error interno del servidor" });
				// } else if (result === 0) {
				//     res.status(404).json({ error: 'Like no encontrado' });
			} else {
				res.status(204).end(); // 204: No Content
			}
		});
	}
}

module.exports = new LikeController();
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
