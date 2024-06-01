const { where } = require('sequelize');
const { colaborador, rol, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Op = Sequelize.Op
let self = {}

// GET /api/colaboradores/{id}
self.recuperar = async function (req, res) {
    try {
        let id = req.params.id;
        let data = await colaborador.findByPk(id, { attributes: [['id','colaboradorId'], 'usuario', 'nombre', 'apellido', 'correo', 'contrasenia', 'descripcion', 'rolid', 'icono']});
        if (data)
            return res.status(200).json(data)
        else
            return res.status(404).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// GET /api/colaboradores?rol=r
self.recuperarTodos = async function (req, res) {
    try {
        let filtros = {}

        if (req.query.rol != null){
            let rolusuario = await rol.findOne({
                where: { nombre: req.query.rol },
                attributes: ['id']
            })

            if (rolusuario) {
                filtros.rolid = rolusuario.id;
            } else {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
        }

        let data = await colaborador.findAll({
            where: filtros,
            attributes: [['id', 'colaboradorId'], 'usuario', 'nombre', 'apellido', 'correo', 'contrasenia', 'descripcion', 'rolid', 'icono'],
            subQuery: false
        })

        if (data.length > 0)
            return res.status(200).json(data)
        else
            return res.status(404).send()
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}

// POST /api/colaboradores
self.crear = async function (req, res) {
    try {
        const rolusuario = await rol.findOne({ where: { nombre: req.body.rol }})
        console.log(rolusuario.id)

        const data = await colaborador.create({
            id: crypto.randomUUID(),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            correo: req.body.correo,
            contrasenia: await bcrypt.hash(req.body.contrasenia, 10),
            descripcion: req.body.descripcion,
            icono: req.body.icono,
            rolid: rolusuario.id,
        })

        return res.status(201).json({
            id: data.id,
            email: data.email,
            nombre: data.nombre,
            rolid: rolusuario.nombre
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// PUT /api/colaboradores/{id}
self.actualizar = async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await colaborador.update(body, { where: { id: id} });

        if (data[0] == 0)
            return res.status(404).send()
        else
            return res.status(204).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = self;