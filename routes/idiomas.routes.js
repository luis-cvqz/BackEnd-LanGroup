const router = require('express').Router()
const idiomas = require('../controllers/idiomas.controller')
// const Authorize = require('../middlewares/auth.middleware)

// TODO: Rol para ejecutar estos metodos es Administrador, agregar cuando este la autorizacion

// GET: api/idiomas
router.get('/', idiomas.recuperarTodos)

// GET: api/idiomas/:id
router.get('/:id', idiomas.recuperar)

// POST
router.post('/', idiomas.crear)

// PUT
router.put('/:id', idiomas.actualizar)

// DELETE
router.delete('/:id', idiomas.eliminar)

module.exports = router