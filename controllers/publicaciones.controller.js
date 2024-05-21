const { publicacion, colaborador, grupo, Sequelize} = require('../models')
const Op = Sequelize.Op
const crypto = require('crypto')

let self = {}

// GET api/publicaciones/grupo?={grupo}&idioma?={idioma}
self.recuperarTodas = async function (req, res) {
  try {
    const { idioma, grupo } = req.query

    const filtros = {}
    if (grupo) {
      filtros.grupoid = {
        [Op.eq]: grupo
      }
    }
    if (idioma) {
      filtros.idioma = {
        [Op.like]: `%${idioma}%`
      }
    }

    const publicaciones = await publicacion.findAll({
      where: filtros,
      attributes: [
        'idpublicacion',
        'titulo',
        'descripcion',
        [Sequelize.col('idioma.nombre', 'idioma')],
        'fecha',
        [Sequelize.col('colaborador.nombre', 'instructor')],
        [Sequelize.col('grupo.nombre', 'grupo')]],
      include: [
        { model: idioma, attributes: [] },
        { model: colaborador, attributes: [] },
        { model: grupo, attributes: [] },
        {
          model: archivomultimedia,
          as: 'archivos',
          attributes: ['idarchivo', 'nombre', 'mime', 'tamanio'],
          throgh: { attributes: [] }
        },
      ]
    })

    return res.status(200).json(publicaciones)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// GET API/publicaciones/:id
self.recuperar = async function (req, res) {
  try {
    let id = req.params.idpublicacion

    let data = await publicacion.findByPk(id, {
      attributes: [
        'idpublicacion',
        'titulo',
        'descripcion',
        [Sequelize.col('idioma.nombre'), 'idioma'],
        'fecha',
        [Sequelize.col('colaborador.nombre'), 'instructor'],
        [Sequelize.col('grupo.nombre'), 'grupo']],
      include: [
        { model: idioma, attributes: [] },
        { model: colaborador, attributes: [] },
        { model: grupo, attributes: [] },
        {
          model: archivomultimedia,
          as: 'archivos',
          attributes: ['idarchivo', 'nombre', 'mime', 'tamanio'],
          throgh: { attributes: [] }
        },
      ]
    })
    if (data) 
      return res.status(200).json(data)
    else
      return res.status(404).json({ message: 'No se encontró la publicación' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// POST api/publicaciones
self.crear = async function (req, res) {
  try {
    let data = await publicacion.create({
      idpublicacion: crypto.randomUUID(),
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha: new Date(),
      usuarioid: req.body.usuarioid,
      grupoclave: req.body.grupoid,
    })
    return res.status(201).json(data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// PUT api/publicaciones/:id
// TODO: Implementar el método para actualizar una publicación

self.eliminar = async function (req, res) {
  try {
    let id = req.params.idpublicacion
    let data = await publicacion.findByPk(id)

    if (!data)
      return res.status(404).send()

    data = await publicacion.destroy({ where: { idpublicacion: id } })
    
    if (data === 1)
      return res.status(204).send()
    else
      return res.status(404).send()

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// POST api/publicaciones/:idpublicacion/archivos
self.asignaArchivo = async function (req, res) {
  try {
    let archivo = await archivomultimedia.findByPk(req.body.idarchivo)
    if (!archivo) return res.status(404).send()
    
    let publicacion = await publicacion.findByPk(req.params.idpublicacion)
    if (!publicacion) return res.status(404).send()

    await data.addArchivos(archivo)
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// DELETE api/publicaciones/:idpublicacion/archivos/:idarchivo
// TODO: Implementar el método para desasignar un archivo de una publicación

module.exports = self