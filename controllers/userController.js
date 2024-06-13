// userController.js
const userService = require("../services/userService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class UserController {
	async getAllUser(req, res) {
		// Recuperar información de los parámetros de la petición
		const { listado } = req.query;

		// Si se trata de un listado (existe el parámetro listado), invoco otro servicio
		if (listado) {
			userService.getAllUserListado((err, data) => {
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
					res.json(Respuesta.exito(data, "Listado de users recuperado"));
				}
			});
		} else {
			// No se trata de un listado
			// Implementa la lógica para obtener todos los datos
			userService.getAllUser((err, data) => {
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
					res.json(Respuesta.exito(data, "Datos de users recuperados"));
				}
			});
		}
	}

	async getUserById(req, res) {
		// Implementa la lógica para obtener un dato por ID
		// Recuperar información de los parámetros de la petición
		const { relations } = req.query;
		// Recuperar información que vienen en la ruta '/:id'
		const userId = req.params.id;

		// Si hay que recuperar los datos relacionados (relations), invoco otro servicio
		if (relations) {
			userService.getUserByIdRelations(userId, (err, user) => {
				if (err) {
					res
						.status(500)
						.json(
							Respuesta.error(
								user,
								"Error al recuperar los datos:" + req.originalUrl
							)
						);
				} else if (user == null) {
					logMensaje(
						"Respuesta es:" +
							JSON.stringify(
								Respuesta.error(user, "User no encontrado" + req.originalUrl)
							)
					);
					res
						.status(404)
						.json(Respuesta.error(user, "User no encontrado: " + userId));
				} else {
					res.json(Respuesta.exito(user, "User recuperado"));
				}
			});
		} else {
			// No necesito recuperar datos relacionados

			// Implementa la lógica para obtener el user
			userService.getUserById(userId, (err, user) => {
				if (err) {
					res
						.status(500)
						.json(
							Respuesta.error(
								user,
								"Error al recuperar los datos:" + req.originalUrl
							)
						);
				} else if (user == null) {
					res
						.status(404)
						.json(Respuesta.error(user, "User no encontrado: " + userId));
				} else {
					res.json(Respuesta.exito(user, "User recuperado"));
				}
			});
		}
	}

	async createUser(req, res) {
		// Implementa la lógica para crear un nuevo dato
		// Recuperar objeto con el user a dar de alta
		const userData = req.body;
		// logMensaje(req)

		userService.createUser(userData, (err, result) => {
			if (err) {
				res
					.status(500)
					.json(
						Respuesta.error(
							result,
							"Error al insertar el user:" + req.originalUrl
						)
					);
			} else {
				// 201: Created
				res
					.status(201)
					.json(
						Respuesta.exito({ insertId: result.insertId }, "User dado de alta")
					);
			}
		});
	}

	async updateUser(req, res) {
		// Implementa la lógica para actualizar un dato por ID
		// Implementa la lógica para eliminar un dato por ID
		// Recuperar información que vienen en la ruta '/:id'
		const userId = req.params.id;

		const userData = req.body;

		// Implementa la lógica para eliminar el user
		userService.updateUser(userId, userData, (err, result) => {
			if (err) {
				console.error("Error al modificar el usuario:", err);
				res.status(500).json({ error: "Error interno del servidor" });
				// } else if (result === 0) {
				//     res.status(404).json({ error: 'User no encontrado' });
			} else {
				res
					.status(201)
					.json(
						Respuesta.exito({ insertId: result.insertId }, "Usuario modificado")
					);
			}
		});
	}

	async deleteUser(req, res) {
		// Implementa la lógica para eliminar un dato por ID
		// Recuperar información que vienen en la ruta '/:id'
		const userId = req.params.id;
		// Implementa la lógica para eliminar el user
		userService.deleteUser(userId, (err, result) => {
			if (err) {
				console.error("Error al eliminar user:", err);
				res.status(500).json({ error: "Error interno del servidor" });
				// } else if (result === 0) {
				//     res.status(404).json({ error: 'User no encontrado' });
			} else {
				res.status(204).end(); // 204: No Content
			}
		});
	}
}

module.exports = new UserController();
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
