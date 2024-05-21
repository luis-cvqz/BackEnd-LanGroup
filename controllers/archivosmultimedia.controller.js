const { where } = require('sequelize')
const { archivomultimedia, Sequelize } = require('../models')
const Op = Sequelize.Op
const fs = require('fs')

let self = {}

// GET api/archivosmultimedia
self.recuperarTodos = async function (req, res) {
  try {
    const { publicacionQuery } = req.query

    const filtros = {}
    if (publicacionQuery) {
      filtros.publicacionid = {
        [Op.eq]: publicacionQuery
      }
    }

    let archivo = await archivomultimedia.findAll({
      where: filtros,
      attributes: [
        'idarchivo', 
        'publicacionid', 
        'nombre', 
        'mime', 
        'tamanio'
      ],
      subQuery: false
    })

    return res.status(200).json(archivo)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// GET api/archivosmultimedia/:id
self.recuperar = async function (req, res) {
  try {
    let id = req.params.idarchivo

    let archivo = await archivomultimedia.findByPk(id, {
      attributes: [
        'idarchivo', 
        'publicacionid', 
        'nombre',
        'mime', 
        'tamanio'
      ],
      subQuery: false
    })

    // if (esVideo) 
    //     por grpc
    // else
    //     por http

    if (data)
      return res.status(200).json(archivo)
    else
      return res.status(404).json({ message: 'Archivo no encontrado' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}