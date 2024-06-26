const { solicitud, colaborador, idioma, Sequelize } = require('../models');
const Op = Sequelize.Op;
const crypto = require('crypto');
const fs = require('fs');
const logger = require('../services/logger.service'); 
const Acciones = require('../enums/acciones.enum')

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
    logger.error(`Error al recuperar todas las solicitudes: ${error}`); 
    return res.status(500).send();
  }
}

// GET api/solicitudes/:id/detalle
self.recuperarDetalle = async function (req, res) {
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
    logger.error(`Error al recuperar la solicitud por ID: ${error}`); 
    return res.status(500).send();
  }
};

self.recuperarConstancia = async function (req, res) {
  try {
    let id = req.params.id;

    let solicitudEncontrada = await solicitud.findByPk(id)
    if (!solicitudEncontrada)
      return res.status(404).send('No se encontró la solicitud')

    let archivo = null

    if (archivoEncontrado.mime === 'application/pdf')
      archivo = archivoEncontrado.archivo

    return res.status(200).contentType(archivoEncontrado.mime).send(archivo)

  } catch (error) {
    logger.error(`Error al recuperar la solicitud por ID: ${error}`); 
    return res.status(500).send();
  }
}

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
      nombrearchivo: req.body.colaboradorid + '-' + req.body.nombrearchivo,
      estado: req.body.estado
    });

    req.bitacora(`solicitudes.crear`, nuevaSolicitud.id)
    return res.status(201).json({
      contenido: nuevaSolicitud.contenido,
      motivo: nuevaSolicitud.motivo,
      colaboradorid: nuevaSolicitud.colaboradorid,
      idiomaid: nuevaSolicitud.idiomaid,
      nombrearchivo: nuevaSolicitud.nombrearchivo,
      estado: nuevaSolicitud.idiomaid
    });
  } catch (error) {
    logger.error(`Error al crear la solicitud: ${error}`); 
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
      estado: req.body.estado
    }, { where: { id: id} });

    req.bitacora(`solicitudes.editar`, id)
    if (data[0] === 0)
      return res.status(400).send();

    return res.status(204).send();
  } catch (error) {
    logger.error(`Error al actualizar la solicitud: ${error}`); 
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
      req.bitacora(`solicitudes.eliminar`, id)
      fs.existsSync("uploads/" + solicitud.nombrearchivo) && fs.unlinkSync("uploads/" + videoEncontrado.nombrearchivo);
      return res.status(204).send()
    }
    return res.status(404).send();
  } catch (error) {
    logger.error(`Error al eliminar la solicitud: ${error}`); 
    return res.status(500).send();
  }
};

module.exports = self;
