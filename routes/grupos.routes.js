const router = require("express").Router();
const grupos = require("../controllers/grupos.controller");
const Authorize = require("../middlewares/auth.middleware");
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum");

// GET /api/grupos/{id}
router.get("/:id", Authorize("Administrador,Instructor,Aprendiz"), grupos.recuperarPorId);

// GET /api/grupos/idioma/{idiomaNombre}
router.get(
  "/idioma/:idiomaNombre",
  Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`),
  grupos.recuperarPorIdiomaNombre
);

// POST /api/grupos
router.post("/", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`), ValidarObjeto('creargrupo'), grupos.agregarGrupo);

// PUT /api/grupos/{id}
router.put(
  "/:id",
  Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`),
  ValidarObjeto('actualizargrupo'),
  grupos.actualizarGrupo
);

// DELETE /api/grupos/:id
router.delete(
  "/:id",
  Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR}`),
  grupos.eliminarGrupo
);

module.exports = router;
