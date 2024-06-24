const { idioma, colaborador, Sequelize } = require('../models');
const crypto = require('crypto');
const Op = Sequelize.Op;
const logger = require('../services/logger.service'); 
const Acciones = require('../enums/acciones.enum');

let self = {};

// GET /api/idiomas?colaboradorid={colaboradorid}
self.recuperarTodos = async function (req, res) {
  try {
    const { colaboradorid } = req.query;

    let options = {
      attributes: [['id', 'idiomaId'], 'nombre'],
      subQuery: false
    };

    if (colaboradorid) {
      options.include = [{
        model: colaborador,
        attributes: [],
        through: {
          attributes: [],
          where: { colaboradorid: colaboradorid }
        },
        required: true
      }];
    }

    let data = await idioma.findAll(options);

    if (data)
      return res.status(200).json(data);
    else
      return res.status(404).send();
  } catch (error) {
    logger.error(`Error al recuperar los idiomas: ${error}`);
    return res.status(500).send();
  }
};

// GET /api/idiomas/:id
self.recuperar = async function (req, res) {
  try {
    const id = req.params.id;

    let data = await idioma.findByPk(id, {
      attributes: [['id','idiomaId'], 'nombre'],
      subQuery: false
    });

    if (data)
      return res.status(201).json(data);
    else
      return res.status(404).json({message: 'No se encontró ese idioma'});
  } catch (error) {
    logger.error(`Error al recuperar el idioma por ID: ${error}`); 
    return res.status(500).send();
  }
};

// POST /api/idiomas
self.crear = async function (req, res) {
  try {
    let nuevoIdioma = await idioma.create({
      id: crypto.randomUUID(),
      nombre: req.body.nombre
    });
    req.bitacora(`idiomas${Acciones.CREAR}`, nuevoIdioma.id)
    return res.status(201).send(nuevoIdioma);
  } catch (error) {
    logger.error(`Error al crear un nuevo idioma: ${error}`); 
    return res.status(500).send();
  }
};

// PUT /api/idiomas/:id
self.actualizar = async function (req, res) {
  try {
    let id = req.params.id;
    let body = req.body;

    let data = await idioma.update(body, { where: { id: id } });

    if (data[0] === 0) {
      return res.status(404).send();
    } else {
      req.bitacora(`idiomas${Acciones.EDITAR}`, id)
      return res.status(204).send();
    }
  } catch (error) {
    logger.error(`Error al actualizar el idioma: ${error}`);
    return res.status(500).send();
  }
};

// DELETE /api/idiomas/:id
self.eliminar = async function (req, res) {
  try {
    let id = req.params.id;
    let data = await idioma.findByPk(id);

    if (!data)
      return res.status(404).json('Idioma no encontrado.');

    data = await idioma.destroy({ where: { id: id }});
    if (data === 1) {
      req.bitacora(`idiomas${Acciones.ELIMINAR}`, id)
      res.status(204).send();
    }
    else {
      res.status(404).send();
    }
  } catch (error) {
    logger.error(`Error al eliminar el idioma: ${error}`); 
    return res.status(500).send();
  }
};

// POST /api/idiomas/colaboradores
self.asignarColaboradorAIdiomas = async function (req, res) {
  try {
    const { colaboradorId, idiomaIds } = req.body;

    if (!colaboradorId || !idiomaIds || !Array.isArray(idiomaIds) || idiomaIds.length === 0) {
      return res.status(400).json({ error: "colaboradorId e idiomaIds son requeridos" });
    }

    const colab = await colaborador.findByPk(colaboradorId);
    if (!colab) {
      logger.error(`Colaborador con ID ${colaboradorId} no encontrado.`);
      return res.status(404).json({ error: "Colaborador no encontrado" });
    }

    const idiomas = await idioma.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: idiomaIds
        }
      }
    });

    if (idiomas.length !== idiomaIds.length) {
      logger.error(`No todos los idiomas fueron encontrados. Solicitud: ${idiomaIds}, Encontrados: ${idiomas.length}`);
      return res.status(404).json({ error: "Uno o más idiomas no fueron encontrados" });
    }

    await colab.addIdiomas(idiomas);
    logger.info(`Idiomas ${idiomaIds} asignados al colaborador ${colaboradorId}.`);
    return res.status(201).json({ message: "Idiomas asignados al colaborador exitosamente" });
  } catch (error) {
    logger.error(`Error al asignar idiomas al colaborador: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = self;
