// postController.js
const postService = require("../services/postService");
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger");


class PostController {
	async getAllPost(req, res) {
		const { category } = req.query

		if (category != null) {
			postService.getAllPostCategory(category, (err, data) => {
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
					res.json(Respuesta.exito(data, "Datos de posts recuperados"));
				}
			});
		} else {
		// Implementa la lógica para obtener todos los datos
		postService.getAllPost((err, data) => {
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
				res.json(Respuesta.exito(data, "Datos de posts recuperados"));
			}
		});
		}
	}

	async getPostById(req, res) {
		// Implementa la lógica para obtener un dato por ID
		const postId = req.params.id;
		postService.getPostById(postId, (err, data) => {
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
					.json(Respuesta.error(data, "Post no encontrado: " + req.params.id));
			} else {
				res.json(Respuesta.exito(data, "Datos de post recuperados"));
			}
		});
	}

	async createPost(req, res) {
		// Implementa la lógica para crear un nuevo dato
		const post = req.body;
		postService.createPost(post, (err, data) => {
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

	async updatePost(req, res) {
		// Implementa la lógica para actualizar un dato por ID
		const post = req.body;
		const postId = req.params.id;
		postService.updatePost(postId, post, (err, data) => {
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
				res.json(Respuesta.exito(data, "Datos de post actualizados"));
			}
		});
	}

	async deletePost(req, res) {
		// Implementa la lógica para eliminar un dato por ID
		const postId = req.params.id;
		postService.deletePost(postId, (err, data) => {
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

module.exports = new PostController();
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
