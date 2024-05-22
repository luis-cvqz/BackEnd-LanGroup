const { colaborador, Sequelize } = require('../models')
const Op = Sequelize.Op
let self = {}

// GET /api/colaboradores/{id}
self.recuperar = async function (req, res) {
    try {
        let id = req.params.id;
        let data = await colaborador.findByPk(id, { attributes: [['id','colaboradorId'], 'usuario', 'nombre', 'apellido', 'correo', 'contraseña', 'descripcion', 'rol', 'icono']});
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
        const { rol } = req.query

        const filtros = {}
        if (rol) {
            filtros.rol = {
                [Op.like]: `%${rol}%`
            }
        }

        let data = await colaborador.findAll({
            where: filtros,
            attributes: [['id', 'colaboradorId'], 'usuario', 'nombre', 'apellido', 'correo', 'contraseña', 'descripcion', 'rol', 'icono'],
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

// POST /api/colaboradores
self.crear = async function (req, res) {
    try {
        let data = await colaborador.create({
            idusuario: req.body.idusuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            correo: req.body.correo,
            contraseña: req.body.contraseña,
            descripcion: req.body.descripcion,
            icono: req.body.icono,
            rolid: req.body.rolid,
        })

        return res.status(201).json(data)
    } catch (error) {
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