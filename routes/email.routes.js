// routes/email.routes.js
const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller"); // Asegúrate de que la ruta es correcta

// Definir la ruta para enviar correos
router.post("/enviar-correo", emailController.enviarCorreo);

module.exports = router;
