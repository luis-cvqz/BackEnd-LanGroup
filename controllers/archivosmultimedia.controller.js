const { archivomultimedia, Sequelize } = require('../models')
const Op = Sequelize.Op
const crypto = require('crypto')
const fs = require('fs')
const acciones = require('../middlewares/bitacora.middleware')

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
        ['id', 'archivoId'], 
        'publicacionid', 
        'nombre', 
        'mime', 
        'tamanio'
      ],
      subQuery: false
    })

    if (archivo)
      return res.status(200).json(archivo)
    else
      return res.status(404).json('No se encontró el archivo')

  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }
}

// GET api/archivosmultimedia/:id
self.recuperar = async function (req, res) {
  try {
    let id = req.params.id
    
    let archivoEncontrado = await archivomultimedia.findByPk(id)
    if (!archivoEncontrado)
      return res.status(404).send('No se encontró el archivo')

    let imagen = null

    if (archivoEncontrado.mime === 'image/jpeg' || archivoEncontrado.mime === 'image/jpg' || archivoEncontrado.mime === 'image/png')
      imagen = archivoEncontrado.archivo

    return res.status(200).contentType(archivoEncontrado.mime).send(imagen)
    
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }
}

// GET api/archivosmultimedia/:id/detalle
self.recuperarDetalle = async function (req, res) {
  try {
    let id = req.params.id

    let archivo = await archivomultimedia.findByPk(id, {
      attributes: [
        ['id', 'archivoId'], 
        'publicacionid', 
        'nombre',
        'mime', 
        'tamanio'
      ],
      subQuery: false
    })

    if (archivo)
      return res.status(200).json(archivo)
    else
      return res.status(404).json('No se encontró el archivo')

  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }
}

// POST api/archivosmultimedia/videos
self.crearVideo = async function (req, res) {
  try {
    if (!req.body.mime)
      return res.status(400).json('El campo mime es requerido') 

    let mimetype = req.body.mime
   
    let nuevoArchivo = await archivomultimedia.create({
      id: crypto.randomUUID(),
      publicacionid: req.body.publicacionid,
      nombre: req.body.nombre,
      mime: mimetype,
      tamanio: req.body.tamanio,
      indb: false,
      archivo: null
    })

    req.bitacora(`archivosmultimedia${acciones.CREAR}`, nuevoArchivo.id)
    return res.status(201).send(nuevoArchivo)
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }

}

// POST api/archivosmultimedia
self.crear = async function (req, res) {
  try {
    if (!req.file == undefined)
      return res.status(400).json('El archivo es obligatorio')

    let archivoRecibido = fs.readFileSync("uploads/" + req.file.filename)
    fs.existsSync("uploads/" + req.file.filename) && fs.unlinkSync("uploads/" + req.file.filename)

    let nuevoArchivo = await archivomultimedia.create({
      id: crypto.randomUUID(),
      publicacionid: req.body.publicacionid,
      nombre: req.file.filename,
      mime: req.file.mimetype,
      tamanio: req.file.size,
      indb: true,
      archivo: archivoRecibido
    })
    
    req.bitacora(`archivosmultimedia${acciones.CREAR}`,nuevoArchivo.id)
    return res.status(201).json({
      id: nuevoArchivo.id,
      publicacionid: nuevoArchivo.pubicacionid,
      nombre: nuevoArchivo.nombre,
      mime: nuevoArchivo.mime,
    })
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }
}

// DELETE api/archivosmultimedia/:id
self.eliminar = async function (req, res) {
  try {
    const id = req.params.id
    let archivoEncontrado = await archivomultimedia.findByPk(id)

    if (!archivoEncontrado)
      return res.status(404).json('No se encontró el archivo')
    
    let data = await archivomultimedia.destroy({ where: { id: id } })
    if (data === 1) {
      req.bitacora(`archivosmultimedia${acciones.ELIMINAR}`, id)
      return res.status(204).send()
    }
    return res.status(404).json('No se encontró el archivo')
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }
}

// DELETE api/archivosmultimedia/videos/:id
self.eliminarVideo = async function (req, res) {
  try {
    const id = req.params.id

    let videoEncontrado = await archivomultimedia.findByPk(id)
    if (!videoEncontrado)
      return res.status(404).json('No se encontró el video')

    let data = await videoEncontrado.destroy({ where: { id: id } })
    if (data === 1) {
      req.bitacora(`archivosmultimedia${acciones.ELIMINAR}`, id)
      fs.existsSync("uploads/" + videoEncontrado.nombre) && fs.unlinkSync("uploads/" + videoEncontrado.nombre)
    }
    return res.status(204).send()
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`)
    return res.status(500).send()
  }
}

module.exports = self