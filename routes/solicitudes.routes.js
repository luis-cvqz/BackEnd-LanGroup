const router = require('express').Router()
const solicitudes = require('../controllers/solicitudes.controller')
const Authorize = require("../middlewares/auth.middleware");

// GET api/solicitudes
router.get('/', Authorize("Administrador,Instructor,Aprendiz"), solicitudes.recuperarTodas)

// GET api/solicitudes/:id
router.get('/:id', Authorize("Administrador,Instructor,Aprendiz"), solicitudes.recuperar)

// POST api/solicitudes
router.post('/', Authorize("Administrador,Instructor,Aprendiz"), solicitudes.crear)

// PUT api/solicitudes/:id
router.put('/:id', Authorize("Administrador,Instructor,Aprendiz"), solicitudes.actualizar)

// DELETE api/solicitudes/:id
router.delete('/:id', Authorize("Administrador,Instructor,Aprendiz"), solicitudes.eliminar)

module.exports = router