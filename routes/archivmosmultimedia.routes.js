const router = require('express').Router()
const archivosmultimedia = require('../controllers/archivosmultimedia.controller')
const archivomultimedia = require('../models/archivomultimedia')

// GET api/archivosmultimedia
router.get('/', archivosmultimedia.recuperarTodos)

// GET api/archivosmultimedia/:id
router.get('/:id', archivosmultimedia.recuperar)

// GET api/archivosmultimedia/:id/detalle
router.get('/:id/detalle', archivosmultimedia.recuperarDetalle)

// POST api/archivosmultimedia
router.post('/', archivosmultimedia.crear)

// POST api/archivosmultimedia/videos
router.post('/videos', archivosmultimedia.crearVideo)

// PUT api/archivosmultimedia
router.put('/:id', archivosmultimedia.actualizar)

// PUT api/archivosmultimedia/videos/:id
router.put('/videos/:id', archivosmultimedia.actualizarVideo)

// DELETE api/archivosmultimedia
router.delete('/:id', archivosmultimedia.eliminar)

// DELETE api/archivosmultimedia/videos/:id
router.delete('/videos/:id', archivosmultimedia.eliminarVideo)

module.exports = router