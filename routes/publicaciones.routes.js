const router = require('express').Router()
const publicaciones = require('../controllers/publicaciones.controller')
const Authorize = require("../middlewares/auth.middleware");
const AuthorizeActualizacion = require("../middlewares/authActualizar.middleware");
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum");

// GET api/publicaciones/grupo?={grupo}&idioma?={idioma}&colaborador?={colaborador}
router.get('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), publicaciones.recuperarTodas)

// GET api/publicaciones/:id
router.get('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), publicaciones.recuperar)

// POST api/publicaciones
router.post('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), ValidarObjeto('crearpublicacion'), publicaciones.crear)

// POST api/publicaciones/imagenes
router.post('/imagenes', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), ValidarObjeto('crearpublicaionimagen'), publicaciones.crearConImagen)

// PUT api/publicaciones/:id
router.put('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), ValidarObjeto('actualizarpublicacion'), AuthorizeActualizacion, publicaciones.actualizar)

// DELETE api/publicaciones/:id
router.delete('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), publicaciones.eliminar)

module.exports = router