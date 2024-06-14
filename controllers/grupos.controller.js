const { grupo, idioma, Sequelize } = require("../models");
const crypto = require("crypto");
const Op = Sequelize.Op;
const logger = require("../services/logger.service");
const Acciones = require('../enums/acciones.enum');

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
    return res.status(500).send();
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
    return res.status(500).send();
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
    return res.status(500).send();
  }
};

self.recuperarTodos = async function (req, res) {
  const { colaboradorId } = req.query;
  try {
    const queryOptions = {
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaId",
      ],
    };
    
    if (colaboradorId) {
      queryOptions.include = [{
        model: colaborador,
        where: { id: colaboradorId },
        attributes: [], 
        through: { attributes: [] }
      }];
    }

    let data = await grupo.findAll(queryOptions);

    if (data && data.length > 0) {
      return res.status(200).json(data);
    } else {
      logger.error(`No se encontraron grupos${colaboradorId ? ` para el colaborador con ID: ${colaboradorId}` : ''}.`);
      return res.status(404).send({ message: "No se encontraron grupos." });
    }
  } catch (error) {
    logger.error({error});
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};

// GET /api/grupos/colaborador/{colaboradorId}
self.recuperarPorColaborador = async function (req, res) {
  try {
    let colaboradorId = req.params.colaboradorId;

    // Busca en la tabla colaboradorgrupo los registros que coincidan con colaboradorid
    let data = await colaboradorgrupo.findAll({
      where: { colaboradorid: colaboradorId },
      include: [
        {
          model: grupo,
          attributes: [
            ["id", "grupoId"],
            "nombre",
            "descripcion",
            "icono",
            "idiomaid"
          ]
        }
      ]
    });

    // Si se encuentran registros, extraer los datos de los grupos
    if (data.length > 0) {
      const grupos = data.map(entry => entry.grupo);
      return res.status(200).json(grupos);
    } else {
      logger.error(`No se encontraron grupos para el colaborador con id ${colaboradorId}.`);
      return res.status(404).send({ message: "No se encontraron grupos para el colaborador dado" });
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
      req.bitacora(`grupos${Acciones.CREAR}`, nuevoGrupo.id)
      return res.status(201).json(grupoCreado);
    } else {
      logger.error(`No se pudo crear el grupo.`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send();
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

    let data = await grupoExistente.update(req.body);

    if (data[0] == 0)
      return res.status(400).send();
    else {
      req.bitacora(`grupos${Acciones.EDITAR}`, id)
      return res.status(204).json(grupoExistente);
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send();
  }
};

// DELETE /api/grupos/{id}
self.eliminarGrupo = async function (req, res) {
  try {
    let id = req.params.id;
    let deletedRows = await grupo.destroy({ where: { id: id } });

    if (deletedRows > 0) {
      req.bitacora(`grupos${Acciones.ELIMINAR}`, id)
      return res.status(204).send();
    } else {
      logger.error(`Grupo con id ${id} no encontrado.`); 
      return res.status(404).send({ message: "Grupo no encontrado" });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send();
  }
};


module.exports = self;