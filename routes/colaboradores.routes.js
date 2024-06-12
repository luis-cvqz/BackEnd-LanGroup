const router = require("express").Router();
const colaboradores = require("../controllers/colaboradores.controller");
const Authorize = require("../middlewares/auth.middleware");
const AuthorizeActualizacion = require("../middlewares/authActualizar.middleware");
const ValidarObjeto = require("../middlewares/validacion.middleware");

// GET: api/colaboradores/{correo}
router.get("/:correo", Authorize("Administrador,Instructor,Aprendiz"), colaboradores.recuperar);

// GET: api/colaboradores?rol=r
router.get("/", Authorize("Administrador,Instructor,Aprendiz"), colaboradores.recuperarTodos);

// POST: api/colaboradores
router.post("/", ValidarObjeto('crearcolaborador'), colaboradores.crear);

// PUT: api/colaboradores/{id}
router.put("/:id", Authorize("Administrador,Instructor,Aprendiz"), AuthorizeActualizacion, ValidarObjeto('actualizarcolaborador'), colaboradores.actualizar);

module.exports = router;
