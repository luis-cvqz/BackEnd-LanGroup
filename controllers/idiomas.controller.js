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
self.asignarColaboradorAIdioma = async function (req, res) {
  try {
    const { colaboradorid, idiomaid } = req.body;

    if (!colaboradorid || !idiomaid) {
      return res.status(400).json({ error: "colaboradorid e idiomaid son requeridos" });
    }

    const idiomaExistente = await idioma.findByPk(idiomaid,);

    if (!idiomaExistente) {
      return res.status(404).json({ error: "El idioma no existe" });
    }

    const colaboradorExistente = await colaborador.findByPk(colaboradorid);

    if (!colaboradorExistente) {
      return res.status(404).json({ error: "El colaborador no existe" });
    }

    await colaboradorExistente.addIdiomas(idiomaExistente);
    return res.status(201).json({ message: "Colaborador asignado al idioma exitosamente" });
  } catch (error) {
    logger.error(`Error al asignar colaborador al idioma: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = self;
