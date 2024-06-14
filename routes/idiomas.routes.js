const router = require('express').Router()
const idiomas = require('../controllers/idiomas.controller')
const Authorize = require('../middlewares/auth.middleware')
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum")

// TODO: Rol para ejecutar estos metodos es Administrador, agregar cuando este la autorizacion

// GET: api/idiomas
router.get('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), idiomas.recuperarTodos)

// GET: api/idiomas/:id
router.get('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), idiomas.recuperar)

// POST
router.post('/', Authorize(`${Roles.ADMINISTRADOR}`), ValidarObjeto('idioma'), idiomas.crear)

// PUT
router.put('/:id', Authorize(`${Roles.ADMINISTRADOR}`), ValidarObjeto('idioma'), idiomas.actualizar)

// DELETE
router.delete('/:id', Authorize(`${Roles.ADMINISTRADOR}`), idiomas.eliminar)

// POST
router.post('/colaborador', Authorize(`${Roles.ADMINISTRADOR}`), idiomas.agregarIdiomaColaborador)

module.exports = router