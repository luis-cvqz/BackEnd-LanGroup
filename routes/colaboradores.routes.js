<<<<<<< HEAD
const router = require("express").Router();
const colaboradores = require("../controllers/colaboradores.controller");

// GET: api/colaboradores/{id}
router.get("/:id", colaboradores.recuperar);

// GET: api/colaboradores?rol=r
router.get("/", colaboradores.recuperarTodos);

// POST: api/colaboradores
router.post("/", colaboradores.crear);

// PUT: api/colaboradores/{id}
router.put("/:id", colaboradores.actualizar);

module.exports = router;
=======
const router = require('express').Router();
const colaboradores = require('../controllers/colaboradores.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/colaboradores/{id}
router.get('/:id', Authorize('Administrador,Aprendiz'), colaboradores.recuperar);

// GET: api/colaboradores?rol=r
router.get('/', Authorize('Administrador'), colaboradores.recuperarTodos);

// POST: api/colaboradores
router.post('/', Authorize('Administrador,Aprendiz'), colaboradores.crear);

// PUT: api/colaboradores/{id}
router.put('/:id', Authorize('Administrador,Aprendiz'), colaboradores.actualizar);

module.exports = router
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
