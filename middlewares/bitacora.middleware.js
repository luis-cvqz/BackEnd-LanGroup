const jwt = require('jsonwebtoken')
const requestIp = require('request-ip')
const ClaimTypes = require('../config/claimtypes')
const { bitacora } = require('../models')

const bitacoralogger = (req, res, next) => {
  const ip = requestIp.getClientIp(req)
  let idColaborador = 'invitado'

  req.bitacora = async (accion, id) => {
    const authHeader = req.header('Autorization')

    if (authHeader) {
      if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        const tokenDecodificado = jwt.decode(token)
        idColaborador = tokenDecodificado[ClaimTypes.Name] ?? id
        console.log(token)
        console.log(tokenDecodificado)
        console.log(tokenDecodificado[ClaimTypes.Name])
        console.log(idColaborador)
      }
    }

    await bitacora.create({
      accion: accion,
      elementoid: id,
      ip, ip,
      usuario: idColaborador,
      fecha: new Date()
    })
  }
  next()
}

module.exports = bitacoralogger