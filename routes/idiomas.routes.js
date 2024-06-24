const router = require('express').Router()
const idiomas = require('../controllers/idiomas.controller')
const Authorize = require('../middlewares/auth.middleware')
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum")

// TODO: Rol para ejecutar estos metodos es Administrador, agregar cuando este la autorizacion

// GET /api/idiomas?colaboradorid={colaboradorid}
router.get('/', idiomas.recuperarTodos)

// GET: api/idiomas/:id
router.get('/:id', idiomas.recuperar)

// POST
router.post('/', Authorize(`${Roles.ADMINISTRADOR}`), ValidarObjeto('idioma'), idiomas.crear)

// POST /api/idiomas/colaboradores
router.post('/colaboradores', idiomas.asignarColaboradorAIdiomas)

// PUT
router.put('/:id', Authorize(`${Roles.ADMINISTRADOR}`), ValidarObjeto('idioma'), idiomas.actualizar)

// DELETE
router.delete('/:id', Authorize(`${Roles.ADMINISTRADOR}`), idiomas.eliminar)


module.exports = router