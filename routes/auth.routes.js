const router = require('express').Router()
const auth = require('../controllers/auth.controller')
const Authorize = require('../middlewares/auth.middleware')
const ValidarObjeto = require("../middlewares/validacion.middleware");

// POST: api/auth
router.post('/', ValidarObjeto('iniciarsesion'), auth.login)

// GET: api/auth/tiempo
router.get('/tiempo', auth.tiempo)

module.exports = router