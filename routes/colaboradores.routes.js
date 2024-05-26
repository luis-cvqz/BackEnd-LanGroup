const router = require('express').Router();
const colaboradores = require('../controllers/colaboradores.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/colaboradores/{id}
router.get('/:id', Authorize('Administrador,Aprendiz'), colaboradores.recuperar);

// GET: api/colaboradores?rol=r
router.get('/', Authorize('Administrador'), colaboradores.recuperarTodos);

// POST: api/colaboradores
router.post('/', Authorize('Administrador'), colaboradores.crear);

// PUT: api/colaboradores/{id}
router.put('/:id', Authorize('Administrador'), colaboradores.actualizar);

module.exports = router