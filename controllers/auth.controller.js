const bcrypt = require('bcrypt')
const { colaborador, rol, Sequelize } = require('../models')
const { GeneraToken, TiempoRestanteToken } = require('../services/jwttoken.service')

let self = {}

// POST: api/auth
self.login = async function (req, res) {
    const { correo, contrasenia } = req.body

    try {
        let data = await colaborador.findOne({
            where: { correo: correo },
            raw: true,
            attributes: ['id', 'usuario', 'correo', 'nombre', 'apellido', 'contrasenia', 'icono', 'descripcion', [Sequelize.col('rol.nombre'), 'rol']],
            include: { model: rol, attributes: [] }
        })

        if (data == null) {
            logger.error(`Correo ${correo} no encontrado.`); // Log para indicar que el correo no fue encontrado
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.'})
        }

        const passwordMatch = await bcrypt.compare(contrasenia, data.contrasenia)
        if (!passwordMatch) {
            logger.error(`Contraseña incorrecta para el correo ${correo}.`); // Log para indicar que la contraseña es incorrecta
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.'})
        }

        token = GeneraToken(data.correo, data.usuario, data.rol)

        return res.status(200).json({
            correo: data.correo,
            usuario: data.usuario,
            rol: data.rol,
            jwt: token
        })
    } catch (error) {
        logger.error(`Error interno del servidor: ${error.message}`); // Log con el mensaje de error específico
        return res.status(500).json(error)
    }
}


// GET: api/auth/tiempo
self.tiempo = async function (req, res) {
    const tiempo = TiempoRestanteToken(req)
    if (tiempo == null) {
        logger.error(`No se pudo obtener el tiempo restante del token.`);
        return res.status(404).send()
    }
    return res.status(200).send(tiempo)
}

module.exports = self