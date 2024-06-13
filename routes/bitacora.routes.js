const router = require('express').Router()
const bitacora = require('../controllers/bitacora.controller')
const Authorize = require('../middlewares/auth.middleware')
const Roles = require("../enums/roles.enum")

// GET: api/bitacora
router.get('/', Authorize(`${Roles.ADMINISTRADOR}`), bitacora.recuperarTodas)

module.exports = router