const router = require('express').Router()
const publicaciones = require('../controllers/publicaciones.controller')

// GET api/publicaciones/grupo?={grupo}&idioma?={idioma}&colaborador?={colaborador}
router.get('/', publicaciones.recuperarTodas)

// GET api/publicaciones/:id
router.get('/:id', publicaciones.recuperar)

// POST api/publicaciones
router.post('/', publicaciones.crear)

// PUT api/publicaciones/:id
router.put('/:id', publicaciones.actualizar)

// DELETE api/publicaciones/:id
router.delete('/:id', publicaciones.eliminar)

module.exports = router