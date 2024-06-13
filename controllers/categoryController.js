// categoryController.js
const categoryService = require("../services/categoryService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class CategoryController {
	async getAllCategory(req, res) {
		
			categoryService.getAllCategory((err, data) => {
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
					res.json(Respuesta.exito(data, "Datos de categorias recuperados"));
				}
			});
		
	}

	

}

module.exports = new CategoryController();
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
