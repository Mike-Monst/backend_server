// commentController.js
const commentService = require("../services/commentService");
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger");


class CommentController {
	async getAllComment(req, res) {
		const { postId } = req.query;
		if (postId != null) {
			commentService.getAllCommentPostId(postId, (err, data) => {
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
					res.json(Respuesta.exito(data, "Datos de comments recuperados"));
				}
			});
		} else {
		// Implementa la lógica para obtener todos los datos
		commentService.getAllComment((err, data) => {
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
				res.json(Respuesta.exito(data, "Datos de comments recuperados"));
			}
		});
		}
	}

	async getCommentById(req, res) {
		// Implementa la lógica para obtener un dato por ID
		const commentId = req.params.id;
		commentService.getCommentById(commentId, (err, data) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(
							data,
							"Error al recuperar los datos:" + req.originalUrl
						)
					);
			} else if (data == null) {
				res
					.status(404)
					.json(Respuesta.error(data, "Comment no encontrado: " + req.params.id));
			} else {
				res.json(Respuesta.exito(data, "Datos de comment recuperados"));
			}
		});
	}

	async createComment(req, res) {
		// Implementa la lógica para crear un nuevo dato
		const comment = req.body;
		commentService.createComment(comment, (err, data) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(data, "Error al crear el dato:" + req.originalUrl)
					);
			} else {
				res
					.status(201)
					.json(Respuesta.exito(data, "Datos de de reserva creado"));
			}
		});
	}

	async updateComment(req, res) {
		// Implementa la lógica para actualizar un dato por ID
		const comment = req.body;
		const commentId = req.params.id;
		commentService.updateComment(commentId, comment, (err, data) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(
							data,
							"Error al actualizar el dato:" + req.originalUrl
						)
					);
			} else {
				res.json(Respuesta.exito(data, "Datos de comment actualizados"));
			}
		});
	}

	async deleteComment(req, res) {
		const reqIndex = req.params.id.indexOf('&');
		const comment_id = req.params.id.substring(0, reqIndex);
		const post_id = req.params.id.substring(reqIndex + 1);
		// Implementa la lógica para eliminar un dato por ID
		commentService.deleteComment(comment_id, post_id, (err, data) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(
							data,
							"Error al eliminar el dato:" + req.originalUrl
						)
					);
			} else {
				res
					.status(204)
					.json(Respuesta.exito(data, "Datos de reserva eliminados"));
			}
		});
	}
}

module.exports = new CommentController();
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
