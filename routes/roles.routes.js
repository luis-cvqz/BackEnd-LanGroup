const router = require('express').Router();
const roles = require('../controllers/roles.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/roles/{nombre}
router.get('/:nombre', Authorize('Administrador,Aprendiz'), roles.recuperar);

module.exports = router