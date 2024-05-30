const router = require('express').Router();
const roles = require('../controllers/roles.controller')

// GET: api/roles/{nombre}
router.get('/:nombre', roles.recuperar);

module.exports = router