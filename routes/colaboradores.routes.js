const router = require("express").Router();
const colaboradores = require("../controllers/colaboradores.controller");
const Authorize = require("../middlewares/auth.middleware");
const AuthorizeActualizacion = require("../middlewares/authActualizar.middleware");
const ValidarObjeto = require("../middlewares/validacion.middleware");
const Roles = require("../enums/roles.enum");

// GET: api/colaboradores/{correo}
router.get("/:correo", colaboradores.recuperar);

// GET: api/colaboradores?rol=r
router.get("/", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), colaboradores.recuperarTodos);

// POST: api/colaboradores
router.post("/", ValidarObjeto('crearcolaborador'), colaboradores.crear);

// PUT: api/colaboradores/{id}
router.put("/:id", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), AuthorizeActualizacion, ValidarObjeto('actualizarcolaborador'), colaboradores.actualizar);

// PUT: api/colaboradores/{id}/rol
router.put("/:id/rol", Authorize(`${Roles.ADMINISTRADOR},${Roles.INSTRUCTOR},${Roles.APRENDIZ}`), ValidarObjeto('actualizarrolcolaborador'), colaboradores.actualizarrol);

module.exports = router;
