const router = require('express').Router()
const archivosmultimedia = require('../controllers/archivosmultimedia.controller')
const upload = require('../middlewares/upload.middleware')
const Authorize = require("../middlewares/auth.middleware");

// GET api/archivosmultimedia
router.get('/', Authorize("Administrador,Instructor,Aprendiz"), archivosmultimedia.recuperarTodos)

// GET api/archivosmultimedia/:id
router.get('/:id', Authorize("Administrador,Instructor,Aprendiz"), archivosmultimedia.recuperar)

// GET api/archivosmultimedia/:id/detalle
router.get('/:id/detalle', Authorize("Administrador,Instructor,Aprendiz"), archivosmultimedia.recuperarDetalle)

// POST api/archivosmultimedia
router.post('/', Authorize("Administrador,Instructor"), upload.single("file"), archivosmultimedia.crear)

// POST api/archivosmultimedia/videos
router.post('/videos', Authorize("Administrador,Instructor"),  archivosmultimedia.crearVideo)

// DELETE api/archivosmultimedia/:id
router.delete('/:id', Authorize("Administrador,Instructor"), archivosmultimedia.eliminar)

// DELETE api/archivosmultimedia/videos/:id
router.delete('/videos/:id', Authorize("Administrador,Instructor"), archivosmultimedia.eliminarVideo)

module.exports = router