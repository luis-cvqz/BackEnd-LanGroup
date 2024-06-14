const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller");
const Authorize = require("../middlewares/auth.middleware");
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum");

router.post("/verificacion", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), ValidarObjeto('enviarCorreo'), emailController.enviarCorreo);

module.exports = router;
