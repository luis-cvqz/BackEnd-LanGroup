const router = require('express').Router()
const archivosmultimedia = require('../controllers/archivosmultimedia.controller')
const upload = require('../middlewares/upload.middleware')
const Authorize = require("../middlewares/auth.middleware")
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum")

// GET api/archivosmultimedia
router.get('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), archivosmultimedia.recuperarTodos)

// GET api/archivosmultimedia/:id
router.get('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), archivosmultimedia.recuperar)

// GET api/archivosmultimedia/:id/detalle
router.get('/:id/detalle', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), archivosmultimedia.recuperarDetalle)

// POST api/archivosmultimedia
router.post('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), upload.single("file"), ValidarObjeto('creararchivomultimedia'), archivosmultimedia.crear)

// POST api/archivosmultimedia/videos
router.post('/videos', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), ValidarObjeto('creararchivomultimediavideo'), archivosmultimedia.crearVideo)

// DELETE api/archivosmultimedia/:id
router.delete('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), archivosmultimedia.eliminar)

// DELETE api/archivosmultimedia/videos/:id
router.delete('/videos/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), archivosmultimedia.eliminarVideo)
module.exports = router