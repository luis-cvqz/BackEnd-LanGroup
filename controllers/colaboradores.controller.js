const { colaborador } = require('../models')
let self = {}

// GET /api/colaboradores/{id}
self.get = async function (req, res) {
    try {
        let id = req.params.id;
        let data = await colaborador.findByPk(id, { attributes: ['idusuario', 'usuario', 'nombre', 'apellido', 'correo', 'contraseña', 'descripcion', 'rol', 'icono']});
        if (data)
            return res.status(200).json(data)
        else
            return res.status(404).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// GET /api/colaboradores?rol=r
self.getAll = async function (req, res) {
    try {
        let data = await colaborador.create({
            
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

// POST /api/ colaboradores
self.create = async function (req, res) {

}

// PUT /api/colaboradores /{id}
self.update = async function (req, res) {

}