// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");

const cors = require('cors');
// Importar gestores de rutas
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { logMensaje } = require("./utils/logger");
const { log } = require("console");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173' // replace with the origin of your user-side application
  }));
// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar rutas
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/categories", categoryRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta para manejar las solicitudes al archivo index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});



// Iniciar el servidor
app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});


