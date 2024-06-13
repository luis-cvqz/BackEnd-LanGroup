const router = require('express').Router();
const interacciones = require('../controllers/interacciones.controller')
const Authorize = require('../middlewares/auth.middleware')
const AuthorizeActualizacion = require("../middlewares/authActualizar.middleware")
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum")

// GET /api/interacciones/{publicacionid}
router.get("/:publicacion", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), interacciones.recuperarTodos);

// POST /api/interacciones
router.post("/", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), ValidarObjeto('crearinteraccion'), interacciones.crear);

// PUT /api/interacciones/{interaccionid}
router.put("/:interaccion", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), ValidarObjeto('actualizarinteraccion'), AuthorizeActualizacion, interacciones.actualizar);

// DELETE /api/interacciones/{interaccionid}
router.delete("/:interaccion", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), interacciones.eliminar);

module.exports = router