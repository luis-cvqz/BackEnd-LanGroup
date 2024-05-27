const { grupo, idioma, Sequelize } = require("../models");
const crypto = require("crypto");
const Op = Sequelize.Op;

let self = {};

// GET /api/grupos/{id}
self.recuperarPorId = async function (req, res) {
  try {
    let id = req.params.id;
    let data = await grupo.findByPk(id, {
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaId",
      ],
    });
    if (data) return res.status(200).json(data);
    else return res.status(405).send();
  } catch (error) {
    return res.status(500).json(error);
  }
};

// GET /api/grupos/idioma/{idiomaId}
self.recuperarPorIdioma = async function (req, res) {
  try {
    let id = req.params.idiomaId;
    let data = await grupo.findAll({
      where: { idiomaId: id },
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaId",
      ],
    });
    if (data) return res.status(200).json(data);
    else return res.status(405).send();
  } catch (error) {
    return res.status(500).json(error);
  }
};

/// GET /api/grupos/idioma/{idiomaNombre}
self.recuperarPorIdiomaNombre = async function (req, res) {
  try {
    let idiomaNombre = req.params.idiomaNombre;

    // Buscar el idioma por su nombre
    let idiomaData = await idioma.findOne({
      where: { nombre: idiomaNombre },
    });

    if (!idiomaData) {
      return res.status(404).send({ message: "Idioma no encontrado" });
    }

    // Buscar los grupos que tengan el id del idioma encontrado
    let data = await grupo.findAll({
      where: { idiomaid: idiomaData.id },
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaid",
      ],
      include: [
        {
          model: idioma,
          attributes: ["nombre"],
        },
      ],
    });

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .send({ message: "No se encontraron grupos para el idioma dado" });
    }
  } catch (error) {
    console.error(error); // Imprimir el error en la consola para debugging
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/grupos
self.agregarGrupo = async function (req, res) {
  try {
    const nuevoGrupo = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      icono: req.body.icono,
      idiomaid: req.body.idiomaid,
    };

    // Crea un nuevo grupo en la base de datos
    const grupoCreado = await grupo.create(nuevoGrupo);

    return res.status(201).json(grupoCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/grupos/{id}
self.actualizarGrupo = async (req, res) => {
  try {
    // Obtiene el ID del grupo de los parámetros de la solicitud
    const { id } = req.params;

    // Busca el grupo en la base de datos por su ID
    let grupoExistente = await grupo.findByPk(id);

    // Verifica si el grupo existe
    if (!grupoExistente) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    // Actualiza los datos del grupo con los nuevos valores proporcionados en la solicitud
    grupoExistente = await grupoExistente.update(req.body);

    // Devuelve el grupo actualizado como respuesta
    return res.status(200).json(grupoExistente);
  } catch (error) {
    // Maneja los errores
    console.error("Error al actualizar el grupo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/grupos/{id}
self.eliminarGrupo = async function (req, res) {
  try {
    let id = req.params.id;
    let deletedRows = await grupo.destroy({ where: { id: id } });

    if (deletedRows > 0) {
      return res.status(204).send(); // No Content
    } else {
      return res.status(404).send({ message: "Grupo no encontrado" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = self;
