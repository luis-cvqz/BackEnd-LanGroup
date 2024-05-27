const router = require("express").Router();
const grupos = require("../controllers/grupos.controller");

// GET /api/grupos/{id}
router.get("/:id", grupos.recuperarPorId);

// GET /api/grupos/idioma/{idiomaNombre}
router.get("/idioma/:idiomaNombre", grupos.recuperarPorIdiomaNombre);

// POST /api/grupos
router.post("/", grupos.agregarGrupo);

// PUT /api/grupos/{id}
router.put("/:id", grupos.actualizarGrupo);

// DELETE /api/grupos/:id
router.delete("/:id", grupos.eliminarGrupo);

module.exports = router;
