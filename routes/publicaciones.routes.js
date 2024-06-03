const router = require('express').Router()
const publicaciones = require('../controllers/publicaciones.controller')
const Authorize = require("../middlewares/auth.middleware");
const AuthorizeActualizacion = require("../middlewares/authActualizar");

// GET api/publicaciones/grupo?={grupo}&idioma?={idioma}&colaborador?={colaborador}
router.get('/', Authorize("Administrador,Instructor,Aprendiz"), publicaciones.recuperarTodas)

// GET api/publicaciones/:id
router.get('/:id', Authorize("Administrador,Instructor,Aprendiz"), publicaciones.recuperar)

// POST api/publicaciones
router.post('/', Authorize("Administrador,Instructor"), publicaciones.crear)

// PUT api/publicaciones/:id
router.put('/:id', Authorize("Administrador,Instructor"), AuthorizeActualizacion, publicaciones.actualizar)

// DELETE api/publicaciones/:id
router.delete('/:id', Authorize("Administrador,Instructor"), publicaciones.eliminar)

module.exports = router