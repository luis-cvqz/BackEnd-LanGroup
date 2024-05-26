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
