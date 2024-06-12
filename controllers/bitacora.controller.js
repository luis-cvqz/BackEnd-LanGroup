const { bitacora } = require('../models')

let self = {}

self.recuperarTodas = async function (req, res, next) {
  let data = await bitacora.findAll({
    attributes: [['id', 'bitacoraId'], 'accion', 'elementoid', 'ip', 'usuario', 'fecha'],
    order: [['id','DESC']]
  })
  return res.status(200).json(data)
}

module.exports = self