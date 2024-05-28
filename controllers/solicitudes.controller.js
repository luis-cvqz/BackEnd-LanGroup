const { solicitud, colaborador, idioma, Sequelize } = require('../models')
const Op = Sequelize.Op
const crypto = require('crypto')
const fs = require('fs')

let self = {}

// GET api/solicitudes?idioma=i
self.recuperarTodas = async function (req, res) {
  try {
    const { idiomaquery } = req.query

    const filtros = {}
    if (idiomaquery) {
      filtros.idiomaid = {
        [Op.eq]: idiomaquery
      }
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
    return res.status(500).send()
  }
}

// GET api/solicitudes/:id
self.recuperar = async function (req, res) {
  try {
    let id = req.params.id
    let solicitudEncontrada = await solicitud.findByPk(id, {
      attributes: [
        'id', 'contenido', 'motivo', 'estado', 'nombrearchivo'
      ]
    })
    
    if (solicitudEncontrada)
      return res.status(200).json(solicitudEncontrada)
    else 
      return res.status(404).send()
  } catch (error) {
    return res.status(500).send()
  }
}

// POST /api/solicitudes
self.crear = async function (req, res) {
  try {
    let nuevaSolicitud = await solicitud.create({
      id: crypto.randomUUID(),
      contenido: req.body.contenido,
      motivo: req.body.motivo,
      constancia: null,
      colaboradorid: req.body.colaboradorid,
      idiomaid: req.body.idiomaid,
      nombrearchivo: req.body.colaboradorid + '-' + req.body.nombrearchivo 
    })

    return res.status(201).json({
      contenido: nuevaSolicitud.contenido,
      motivo: nuevaSolicitud.motivo,
      colaboradorid: nuevaSolicitud.colaboradorid,
      idiomaid: nuevaSolicitud.idiomaid,
      nombrearchivo: nuevaSolicitud.nombrearchivo,
      estado: nuevaSolicitud.idiomaid
    })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

// PUT api/solicitudes/:id
self.actualizar = async function (req, res) {
  try {
    let id = req.params.id

    let solicitudEncontrada = await solicitud.findByPk(id)
    if (!solicitudEncontrada)
      return res.status(404).send()

    let data = await solicitud.update({
      contenido: req.body.contenido,
      motivo: req.body.motivo,
      estado: req.body.estado
    }, { where: { id: id} })

    if (data[0] === 0)
      return res.status(404).json('Archivo no encontrado')

    //fs.existsSync("uploads/" + data.nombrearchivo) && fs.unlinkSync("uploads/" + data.nombrearchivo)

    return res.status(204).send
  } catch (error) {
    return res.status(500).send()
  }
}

// DELETE api/solicitudes/:id
self.eliminar = async function (req, res) {
  try {
    const id = req.params.id
  
    let solicitudEncontrada = await solicitud.findByPk(id)
  
    if (!solicitudEncontrada)
      return res.status(404).json('No se encontró la solicitud')
  
    let data = await solicitudEncontrada.destroy({ where: { id: id } })
    if (data === 1) {
      fs.existsSync("uploads/" + solicitud.nombrearchivo) && fs.unlinkSync("uploads/" + videoEncontrado.nombrearchivo)
    }
  
    return res.status(204).send
  } catch (error) {
    return res.status(500).send()
  }
}

module.exports = self