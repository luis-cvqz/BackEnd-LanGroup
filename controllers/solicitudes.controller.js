const { solicitud, colaborador, idioma, Sequelize } = require('../models');
const Op = Sequelize.Op;
const crypto = require('crypto');
const fs = require('fs');
const logger = require('../logger/logger'); 
const acciones = require('../middlewares/bitacora.middleware')

let self = {};

// GET api/solicitudes?idioma=i
self.recuperarTodas = async function (req, res) {
  try {
    const { idiomaquery, colaboradorquery} = req.query

    const filtros = {}
    if (idiomaquery) {
      filtros.idiomaid = {
        [Op.eq]: idiomaquery
      }
    }

    if(colaboradorquery){
      filtros.colaboradorid = {
        [Op.eq]: colaboradorquery
      };
    }

    let data = await solicitud.findAll({
      where: filtros,
      attributes: [
        ['id', 'solicitudId'],
        'contenido',
        'motivo',
        'estado',
        'nombrearchivo'
      ],
      include: [
        {
          model: colaborador,
          attributes: [['id','colaboradorId'],'usuario']
        },
        {
          model: idioma,
          attributes: [['id', 'idiomaId'], 'nombre']
        }
      ],
      subQuery: false
    })

    return res.status(200).json(data)
  } catch (error) {
    logger.error(`Error al recuperar todas las solicitudes: ${error.message}`); 
    return res.status(500).send();
  }
}

// GET api/solicitudes/:id
self.recuperar = async function (req, res) {
  try {
    let id = req.params.id;
    let solicitudEncontrada = await solicitud.findByPk(id, {
      attributes: [
        'id', 'contenido', 'motivo', 'estado', 'nombrearchivo'
      ]
    });
    
    if (solicitudEncontrada)
      return res.status(200).json(solicitudEncontrada);
    else 
      return res.status(404).send();
  } catch (error) {
    logger.error(`Error al recuperar la solicitud por ID: ${error.message}`); 
    return res.status(500).send();
  }
};

// POST /api/solicitudes
self.crear = async function (req, res) {
  try {
    let nuevaSolicitud = await solicitud.create({
      id: crypto.randomUUID(),
      contenido: req.body.contenido,
      motivo: req.body.motivo,
      constancia: req.body.constancia,
      colaboradorid: req.body.colaboradorid,
      idiomaid: req.body.idiomaid,
      nombrearchivo: req.body.colaboradorid + '-' + req.body.nombrearchivo 
    });

    req.bitacora(`solicitudes${acciones.CREAR}`, nuevaSolicitud.id)
    return res.status(201).json({
      contenido: nuevaSolicitud.contenido,
      motivo: nuevaSolicitud.motivo,
      colaboradorid: nuevaSolicitud.colaboradorid,
      idiomaid: nuevaSolicitud.idiomaid,
      nombrearchivo: nuevaSolicitud.nombrearchivo,
      estado: nuevaSolicitud.idiomaid
    });
  } catch (error) {
    logger.error(`Error al crear la solicitud: ${error.message}`); 
    return res.status(500).send();
  }
};

// PUT api/solicitudes/:id
self.actualizar = async function (req, res) {
  try {
    let id = req.params.id;
    let body= req.body;

    let solicitudEncontrada = await solicitud.findByPk(id);
    if (!solicitudEncontrada)
      return res.status(404).send();

    let data = await solicitud.update({
      contenido: req.body.contenido,
      motivo: req.body.motivo,
      estado: req.body.estado
    }, { where: { id: id} });

    req.bitacora(`solicitudes${acciones.EDITAR}`, id)
    if (data[0] === 0)
      return res.status(404).json('Archivo no encontrado');

    return res.status(204).send();
  } catch (error) {
    logger.error(`Error al actualizar la solicitud: ${error.message}`); 
    return res.status(500).send();
  }
};

// DELETE api/solicitudes/:id
self.eliminar = async function (req, res) {
  try {
    const id = req.params.id;
  
    let solicitudEncontrada = await solicitud.findByPk(id);
  
    if (!solicitudEncontrada)
      return res.status(404).json('No se encontró la solicitud');
  
    let data = await solicitudEncontrada.destroy({ where: { id: id } });
    if (data === 1) {
      req.bitacora(`solicitudes${acciones.ELIMINAR}`, id)
      fs.existsSync("uploads/" + solicitud.nombrearchivo) && fs.unlinkSync("uploads/" + videoEncontrado.nombrearchivo);
      return res.status(204).send()
    }
    return res.status(404).send();
  } catch (error) {
    logger.error(`Error al eliminar la solicitud: ${error.message}`); 
    return res.status(500).send();
  }
};

module.exports = self;
