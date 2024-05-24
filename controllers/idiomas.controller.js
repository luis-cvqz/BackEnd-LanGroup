const { idioma, Sequelize } = require('../models')
const crypto = require('crypto')
const Op = Sequelize.Op

let self = {}

// GET /api/idiomas
self.recuperarTodos = async function (req, res) {
  try {
    let data = await idioma.findAll({
      attributes: [['id', 'idiomaId'], 'nombre'],
      subQuery: false
    })

    if (data)
      return res.status(200).json(data)
    else
      return res.status(404).send()
  } catch (error) {
    return res.status(500).json(error)
  }
}

// GET /api/idiomas/:id
self.recuperar = async function (req, res) {
  try {
    const id = req.params.id

    let data = await idioma.findByPk(id, {
      attributes: [['id','idiomaId'], 'nombre'],
      subQuery: false
    })

    if (data)
      return res.status(201).json(data)
    else
      return res.status(404).json({message: 'No se encontró ese idioma'})

  } catch (error) {
    return res.status(500).send()
  }
}

// POST /api/idiomas
self.crear = async function (req, res) {
  try {
    let nuevoIdioma = await idioma.create({
      id: crypto.randomUUID(),
      nombre: req.body.nombre
    })
    return res.status(201).send(nuevoIdioma)
  } catch (error) {
    return res.status(500).send()
  }
}

// PUT /api/idiomas/:id
self.actualizar = async function (req, res) {
  try {
    let id = req.params.id
    let body = req.body

    let data = await idioma.update(body, { where: { id: id } })

    if (data[0] === 0)
      return res.status(404).send()
    else
      return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// DELETE /api/idiomas/:id
self.eliminar = async function (req, res) {
  try {
    let id = req.params.id
    let data = await idioma.findByPk(id)

    if (!data)
      return res.status(404).json('Idioma no encontrado.')

    data = await idioma.destroy({ where: { id: id }})
    if (data === 1)
      res.status(204).send()
    else
      res.status(404).send()
  } catch (error) {
    return res.status(500).send()
  }
}

module.exports = self