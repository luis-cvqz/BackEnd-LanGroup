const router = require('express').Router();
const roles = require('../controllers/roles.controller')
const Authorize = require("../middlewares/auth.middleware")
const Roles = require("../enums/roles.enum")

// GET: api/roles/{id}
router.get('/:id', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), roles.recuperar);

// GET: api/roles/
router.get('/', Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), roles.recuperarTodos);

module.exports = router