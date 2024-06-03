const router = require("express").Router();
const grupos = require("../controllers/grupos.controller");
const Authorize = require("../middlewares/auth.middleware");

// GET /api/grupos/{id}
router.get("/:id", Authorize("Administrador,Instructor,Aprendiz"), grupos.recuperarPorId);

// GET /api/grupos/idioma/{idiomaNombre}
router.get(
  "/idioma/:idiomaNombre",
  Authorize("Administrador,Aprendiz,Instructor"),
  grupos.recuperarPorIdiomaNombre
);

// POST /api/grupos
router.post("/", Authorize("Administrador,Instructor"), grupos.agregarGrupo);

// PUT /api/grupos/{id}
router.put(
  "/:id",
  Authorize("Administrador,Instructor"),
  grupos.actualizarGrupo
);

// DELETE /api/grupos/:id
router.delete(
  "/:id",
  Authorize("Administrador,Instructor"),
  grupos.eliminarGrupo
);

module.exports = router;
