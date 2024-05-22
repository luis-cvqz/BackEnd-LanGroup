const router = require('express').Router()
const publicaciones = require('../controllers/publicaciones.controller')

router.get('/', publicaciones.recuperarTodas)

module.exports = router