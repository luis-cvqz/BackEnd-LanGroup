const router = require('express').Router();
const roles = require('../controllers/roles.controller')
const Authorize = require("../middlewares/auth.middleware");

// GET: api/roles/{id}
router.get('/:id', Authorize("Administrador,Instructor,Aprendiz"), roles.recuperar);

// GET: api/roles/
router.get('/', Authorize("Administrador,Instructor,Aprendiz"), roles.recuperarTodos);

module.exports = router