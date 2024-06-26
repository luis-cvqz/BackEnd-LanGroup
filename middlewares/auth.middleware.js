const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const ClaimTypes = require('../config/claimtypes')
const logger = require('../services/logger.service')
const { GeneraToken } = require('../services/jwttoken.service')

const Authorize = (rol) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.header('Authorization')
            if (!authHeader.startsWith('Bearer ')) {
                logger.error('Formato de token no válido.'); // Log para indicar un formato de token no válido
                return res.status(401).json();
            }

            const token = authHeader.split(' ')[1]
            const decodedToken = jwt.verify(token, jwtSecret)

            if (rol.split(',').indexOf(decodedToken[ClaimTypes.Role]) == -1) {
                logger.error('Rol no autorizado.'); // Log para indicar un rol no autorizado
                return res.status(401).json();
            }

            req.decodedToken = decodedToken

            var minutosRestantes = (decodedToken.exp - (new Date().getTime() / 1000)) / 60;

            if (minutosRestantes < 5) {
                var nuevoToken = GeneraToken(decodedToken[ClaimTypes.Name], decodedToken[ClaimTypes.GivenName], decodedToken[ClaimTypes.Role])
                res.header("Set-Authorization", nuevoToken)
            }

            next()
        } catch (error) {
            logger.error(`Error en la autorización: ${error}`); // Log con el mensaje de error específico
            return res.status(500).send()
        }
    }
}

module.exports = Authorize
