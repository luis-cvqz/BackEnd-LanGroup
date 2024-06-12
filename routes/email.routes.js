// routes/email.routes.js
const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller"); // Asegúrate de que la ruta es correcta
const Authorize = require("../middlewares/auth.middleware");

// Definir la ruta para enviar correos
router.post("/correo", Authorize("Administrador,Instructor,Aprendiz"), emailController.enviarCorreo);

module.exports = router;
