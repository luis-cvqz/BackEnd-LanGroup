const router = require("express").Router();
const grupos = require("../controllers/grupos.controller");

// GET /api/grupos/{id}
router.get("/:id", grupos.recuperar);

// POST /api/grupos
// Aquí puedes definir la lógica para manejar la solicitud POST para crear un nuevo grupo

// PUT /api/grupos/{id}
// Aquí puedes definir la lógica para manejar la solicitud PUT para actualizar un grupo existente por su ID

// DELETE /api/grupos/{id}
// Aquí puedes definir la lógica para manejar la solicitud DELETE para eliminar un grupo existente por su ID

// GET /api/grupos
router.get("", grupos.recuperarTodos);

module.exports = router;
