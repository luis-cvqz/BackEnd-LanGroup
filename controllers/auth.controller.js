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

        if (data == null)
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.'})

        const passwordMatch = await bcrypt.compare(contrasenia, data.contrasenia)
        if (!passwordMatch)
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.'})

        token = GeneraToken(data.correo, data.usuario, data.rol)

        return res.status(200).json({
            correo: data.correo,
            usuario: data.usuario,
            rol: data.rol,
            jwt: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// GET: api/auth/tiempo
self.tiempo = async function (req, res) {
    const tiempo = TiempoRestanteToken(req)
    if (tiempo == null)
        return res.status(404).send()
    return res.status(200).send(tiempo)
}

module.exports = self