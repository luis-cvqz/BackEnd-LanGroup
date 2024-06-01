const router = require("express").Router();
const grupos = require("../controllers/grupos.controller");

// GET /api/grupos/{id}
<<<<<<< HEAD
router.get("/:id", grupos.recuperarPorId);

// GET /api/grupos/idioma/{idiomaNombre}
router.get("/idioma/:idiomaNombre", grupos.recuperarPorIdiomaNombre);

// POST /api/grupos
router.post("/", grupos.agregarGrupo);

// PUT /api/grupos/{id}
router.put("/:id", grupos.actualizarGrupo);

// DELETE /api/grupos/:id
router.delete("/:id", grupos.eliminarGrupo);
=======
router.get("/:id", grupos.recuperar);

// POST /api/grupos
// Aquí puedes definir la lógica para manejar la solicitud POST para crear un nuevo grupo

// PUT /api/grupos/{id}
// Aquí puedes definir la lógica para manejar la solicitud PUT para actualizar un grupo existente por su ID

// DELETE /api/grupos/{id}
// Aquí puedes definir la lógica para manejar la solicitud DELETE para eliminar un grupo existente por su ID

// GET /api/grupos
router.get("", grupos.recuperarTodos);
>>>>>>> main

module.exports = router;
