require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");
const path = require("path");


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);
app.use(express.static(path.join(__dirname, '../public')));

// Conexión a MongoDB
console.log("proceso.......", process.env)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
);
