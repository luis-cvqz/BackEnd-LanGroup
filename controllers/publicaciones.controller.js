const { publicacion, colaborador, idioma, grupo, archivomultimedia, Sequelize} = require('../models')
const Op = Sequelize.Op
const crypto = require('crypto')
const logger = require('../logger/logger'); 

let self = {}

// GET api/publicaciones/grupo?={grupo}&idioma?={idioma}&colaborador?={colaborador}
self.recuperarTodas = async function (req, res) {
  try {

    let filtros = {}

    if (req.query.grupo != null) {
      let grupopublicacion = await grupo.findOne({
        where: { nombre: { [Op.like]: `%${req.query.grupo}%` } },
        attributes: ['id']
      })

      if (grupopublicacion)
        filtros.grupoid = grupopublicacion.id
      else {
        logger.error(`No se encontró el grupo ${req.query.grupo}`); 
        return res.status(404).json('No se encontró el grupo')
      }
    }

    if(req.query.colaborador != null){
      let colaboradorpublicacion = await colaborador.findOne({
        where: { usuario: { [Op.like]: `%${req.query.colaborador}%` } },
        attributes: ['id']
      })

      if(colaboradorpublicacion)
        filtros.colaboradorid = colaboradorpublicacion.id
      else {
        logger.error(`No se encontró el colaborador ${req.query.colaborador}`); 
        return res.status(404).json('No se encontró el colaborador')
      }
    }

    const publicaciones = await publicacion.findAll({
      where: filtros,
      attributes: [ 'id', 'titulo', 'descripcion', 'fecha' ],
      include: [
        { 
          model: colaborador, 
          attributes: [['id', 'colaboradorId'], 'nombre'],
        },
        { 
          model: grupo, 
          attributes: [['id', 'grupoId'], 'nombre'],
          include: [
            {
              model: idioma,
              attributes: [['id', 'idiomaId'], 'nombre'],
            }
          ]
        },
        {
          model: archivomultimedia,
          attributes: [['id', 'archivoid'], 'nombre', 'mime', 'tamanio'],
          throgh: { attributes: [] }
        }
      ]
    })

    return res.status(200).json(publicaciones)
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json({ error: error.message })
  }
}   

// GET API/publicaciones/:id
self.recuperar = async function (req, res) {
  try {
    let id = req.params.id

    let data = await publicacion.findByPk(id, {
      attributes: [ 'id', 'titulo', 'descripcion', 'fecha' ],
      include: [
        { 
          model: colaborador, 
          attributes: [['id', 'colaboradorId'], 'nombre'],
        },
        { 
          model: grupo, 
          attributes: [['id', 'grupoId'], 'nombre'],
          include: [
            {
              model: idioma,
              attributes: [['id', 'idiomaId'], 'nombre'],
            }
          ]
        },
        {
          model: archivomultimedia,
          attributes: [['id', 'archivoid'], 'nombre', 'mime', 'tamanio'],
          throgh: { attributes: [] }
        }
      ]
    })

    console.log(Sequelize.col('publicacion.grupoid'))

    if (data) 
      return res.status(200).json(data)
    else {
      logger.error(`No se encontró la publicación con ID ${id}`); 
      return res.status(404).json({ message: 'No se encontró la publicación' })
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).send()
  }
}

// POST api/publicaciones
self.crear = async function (req, res) {
  try {
    let data = await publicacion.create({
      id: crypto.randomUUID(),
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha: new Date(),
      colaboradorid: req.body.colaboradorid,
      grupoid: req.body.grupoid,
    })
    return res.status(201).json(data)
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).send()
  }
}

// PUT api/publicaciones/:id
self.actualizar = async function (req, res) {
  try {
    let id = req.params.id
    let body = req.body
    let data = await publicacion.update(body, { where: { id: id } })

    if (data[0] === 0)
      return res.status(404).send()
    else
      return res.status(204).json(data)


  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`);
    return res.status(500).send()
  }
}

// DELETE api/publicaciones/:id
self.eliminar = async function (req, res) {
  try {
    let id = req.params.id
    let data = await publicacion.findByPk(id)

    if (!data)
      return res.status(404).send()

    data = await publicacion.destroy({ where: { id: id } })
    
    if (data === 1)
      return res.status(204).send()
    else
      return res.status(404).send()

  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).send()
  }
}

module.exports = self;
