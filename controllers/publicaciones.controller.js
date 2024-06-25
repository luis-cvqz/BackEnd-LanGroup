const { publicacion, colaborador, idioma, grupo, archivomultimedia, Sequelize, sequelize} = require('../models')
const Op = Sequelize.Op
const crypto = require('crypto')
const logger = require('../services/logger.service'); 
const Acciones = require('../enums/acciones.enum')

let self = {}

// GET api/publicaciones/grupo?={grupo}&idioma?={idioma}&colaborador?={colaborador}
self.recuperarTodas = async function (req, res) {
  try {

    let filtros = {}

    if (req.query.grupo != null) {
      let grupopublicacion = await grupo.findOne({
        where: { id: { [Op.like]: `%${req.query.grupo}%` } },
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
        where: { id: { [Op.like]: `%${req.query.colaborador}%` } },
        attributes: ['id']
      })

      if(colaboradorpublicacion)
        filtros.colaboradorId = colaboradorpublicacion.id
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
          attributes: [['id', 'colaboradorId'], 'nombre', 'apellido'],
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
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send();
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
          attributes: [['id', 'colaboradorId'], 'nombre', 'apellido', 'usuario', 'correo'],
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
    logger.error(`Error interno del servidor: ${error}`); 
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

    req.bitacora(`publicaciones.crear`, data.id)
    return res.status(201).json(data)
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send()
  }
}

// POST api/publicaciones/imagenes
self.crearConImagen = async function (req, res) {
  const transaction = await sequelize.transaction()

  const publicacionId = crypto.randomUUID()

  try {
    
    let nuevaPublicacion = await publicacion.create({
      id: publicacionId,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha: new Date(),
      colaboradorid: req.body.colaboradorid,
      grupoid: req.body.grupoid,
    }, { transaction })

    // req.bitacora(`publicaciones${Acciones.CREAR}`,nuevaPublicacion.id)

    if (!req.file)
      return res.status(400).json('El archivo es obligatorio')

    
    let archivoRecibido = fs.readFileSync("uploads/" + req.file.filename)
    fs.existsSync("uploads/" + req.file.filename) && fs.unlinkSync("uploads/" + req.file.filename)

    let nuevoArchivo = await archivomultimedia.create({
      id: crypto.randomUUID(),
      publicacionid: publicacionId,
      nombre: req.file.filename,
      mime: req.file.mimetype,
      tamanio: req.file.size,
      indb: true,
      archivo: archivoRecibido
    }, { transaction })

    //req.bitacora(`archivosmultimedia${Acciones.CREAR}`,nuevoArchivo.id)

    await transaction.commit()
    return res.status(201).json({
      publicacion: nuevaPublicacion,
      archivo: {
        id: nuevoArchivo.id,
        publicacionid: nuevoArchivo.publicacionid,
        nombre: nuevoArchivo.nombre,
        mime: nuevoArchivo.mime,
      }
    });
  } catch (error) {
    await transaction.rollback()
    logger.error(`Error interno del serviddor: ${error}`)
    return res.status(500).send()
  }
}

// PUT api/publicaciones/:id
self.actualizar = async function (req, res) {
  try {
    let id = req.params.id
    let body = req.body
    let data = await publicacion.update(body, { where: { id: id } })

    if (data[0] === 0){
      return res.status(400).send()
    }
    else {
      req.bitacora(`publicaciones.editar`, id)
      return res.status(204).json(data)
    }


  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
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
    
    if (data === 1){
      req.bitacora(`publicaciones.eliminar`, id)
      return res.status(204).send()
    }
    else {
      return res.status(404).send()
    }

  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send()
  }
}

module.exports = self;
