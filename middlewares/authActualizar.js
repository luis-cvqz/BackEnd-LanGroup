const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const ClaimTypes = require('../config/claimtypes')
const logger = require('../logger/logger')

const AuthorizeActualizacion = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Formato de token no válido' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtSecret);

        const IdFromToken = decodedToken[ClaimTypes.Name];
        const IdFromParams = req.params.id;
        const IdFromBody = req.body.colaboradorid;

        if (IdFromToken !== IdFromParams && IdFromToken !== IdFromBody) {
            return res.status(401).json({ error: 'No autorizado para actualizar este usuario' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: `Error en la autorización: ${error.message}` });
    }
};

module.exports = AuthorizeActualizacion;