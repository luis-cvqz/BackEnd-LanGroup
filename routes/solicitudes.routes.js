const router = require('express').Router()
const solicitudes = require('../controllers/solicitudes.controller')

// GET api/solicitudes
router.get('/', solicitudes.recuperarTodas)

// GET api/solicitudes/:id
router.get('/:id', solicitudes.recuperar)

// POST api/solicitudes
router.post('/', solicitudes.crear)

// PUT api/solicitudes/:id
router.put('/:id', solicitudes.actualizar)

// DELETE api/solicitudes/:id
router.delete('/:id', solicitudes.eliminar)

module.exports = router