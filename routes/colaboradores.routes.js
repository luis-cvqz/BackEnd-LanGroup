const router = require("express").Router();
const colaboradores = require("../controllers/colaboradores.controller");
const Authorize = require("../middlewares/auth.middleware");
const AuthorizeActualizacion = require("../middlewares/authActualizar");

// GET: api/colaboradores/{correo}
router.get("/:correo", Authorize("Administrador,Instructor,Aprendiz"), colaboradores.recuperar);

// GET: api/colaboradores?rol=r
router.get("/", Authorize("Administrador,Instructor,Aprendiz"), colaboradores.recuperarTodos);

// POST: api/colaboradores
router.post("/", colaboradores.crear);

// PUT: api/colaboradores/{id}
router.put("/:id", Authorize("Administrador,Instructor,Aprendiz"), AuthorizeActualizacion, colaboradores.actualizar);

module.exports = router;
