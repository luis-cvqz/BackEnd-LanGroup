const router = require('express').Router();
const roles = require('../controllers/roles.controller')

// GET: api/roles/{id}
router.get('/:id', roles.recuperar);

// GET: api/roles/
router.get('/', roles.recuperarTodos);

module.exports = router