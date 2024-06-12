const { grupo, idioma, Sequelize } = require("../models");
const crypto = require("crypto");
const Op = Sequelize.Op;
const logger = require("../services/logger.service");

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
    if (data) {
      return res.status(200).json(data);
    } else {
      logger.error(`Grupo con id ${id} no encontrado.`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
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
    if (data) {
      return res.status(200).json(data);
    } else {
      logger.error(`No se encontro el grupo con el ${id}`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
    return res.status(500).json(error);
  }
};

// GET /api/grupos/idioma/{idiomaNombre}
self.recuperarPorIdiomaNombre = async function (req, res) {
  try {
    let idiomaNombre = req.params.idiomaNombre;

    let idiomaData = await idioma.findOne({
      where: { nombre: idiomaNombre },
    });

    if (!idiomaData) {
      return res.status(404).send({ message: "Idioma no encontrado" });
    }

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
      logger.error(`Grupo con id ${id} no encontrado.`);
      return res.status(404).send({ message: "No se encontraron grupos para el idioma dado" });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/grupos
self.agregarGrupo = async function (req, res) {
  try {
    const nuevoGrupo = {
      id: crypto.randomUUID(),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      icono: req.body.icono,
      idiomaid: req.body.idiomaid,
    };

    const grupoCreado = await grupo.create(nuevoGrupo);

    if (grupoCreado) { 
      req.bitacora(`grupos.crear`, nuevoGrupo.id)
      return res.status(201).json(grupoCreado);
    } else {
      logger.error(`No se pudo crear el grupo.`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


// PUT /api/grupos/{id}
self.actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    let grupoExistente = await grupo.findByPk(id);

    if (!grupoExistente) {
      logger.error(`Grupo con id ${id} no encontrado.`);
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    grupoExistente = await grupoExistente.update(req.body);

    req.bitacora(`grupos.editar`, id)
    return res.status(200).json(grupoExistente);
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/grupos/{id}
self.eliminarGrupo = async function (req, res) {
  try {
    let id = req.params.id;
    let deletedRows = await grupo.destroy({ where: { id: id } });

    if (deletedRows > 0) {
      req.bitacora(`grupos.eliminar`, id)
      return res.status(204).send();
    } else {
      logger.error(`Grupo con id ${id} no encontrado.`); 
      return res.status(404).send({ message: "Grupo no encontrado" });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json(error);
  }
};


module.exports = self;