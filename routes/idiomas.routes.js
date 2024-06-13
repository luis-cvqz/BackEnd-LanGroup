const router = require('express').Router()
const idiomas = require('../controllers/idiomas.controller')
const Authorize = require('../middlewares/auth.middleware')
const Roles = require("../enums/roles.enum")

// TODO: Rol para ejecutar estos metodos es Administrador, agregar cuando este la autorizacion

// GET: api/idiomas
router.get('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), idiomas.recuperarTodos)

// GET: api/idiomas/:id
router.get('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), idiomas.recuperar)

// POST
router.post('/', Authorize(`${Roles.ADMINISTRADOR}`), idiomas.crear)

// PUT
router.put('/:id', Authorize(`${Roles.ADMINISTRADOR}`), idiomas.actualizar)

// DELETE
router.delete('/:id', Authorize(`${Roles.ADMINISTRADOR}`), idiomas.eliminar)

module.exports = router