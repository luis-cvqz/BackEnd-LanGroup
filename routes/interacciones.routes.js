const router = require('express').Router();
const interacciones = require('../controllers/interacciones.controller')
const Authorize = require('../middlewares/auth.middleware')
const AuthorizeActualizacion = require("../middlewares/authActualizar.middleware");

// GET /api/interacciones/{publicacionid}
router.get("/:publicacion", Authorize('Administrador,Instructor,Aprendiz'), interacciones.recuperarTodos);

// POST /api/interacciones
router.post("/", Authorize('Administrador,Instructor,Aprendiz'), interacciones.crear);

// PUT /api/interacciones/{interaccionid}
router.put("/:interaccion", Authorize('Administrador,Instructor,Aprendiz'), AuthorizeActualizacion, interacciones.actualizar);

// DELETE /api/interacciones/{interaccionid}
router.delete("/:interaccion", Authorize('Administrador,Instructor,Aprendiz'), interacciones.eliminar);

module.exports = router