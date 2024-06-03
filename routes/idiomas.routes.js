const router = require('express').Router()
const idiomas = require('../controllers/idiomas.controller')
const Authorize = require('../middlewares/auth.middleware')

// TODO: Rol para ejecutar estos metodos es Administrador, agregar cuando este la autorizacion

// GET: api/idiomas
router.get('/', Authorize("Administrador,Instructor,Aprendiz"), idiomas.recuperarTodos)

// GET: api/idiomas/:id
router.get('/:id', Authorize("Administrador,Instructor,Aprendiz"), idiomas.recuperar)

// POST
router.post('/', Authorize("Administrador"), idiomas.crear)

// PUT
router.put('/:id', Authorize("Administrador"), idiomas.actualizar)

// DELETE
router.delete('/:id', Authorize("Administrador"), idiomas.eliminar)

module.exports = router