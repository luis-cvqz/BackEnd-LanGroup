const { publicacion, interaccion, colaborador } = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
let self = {}

// GET /api/interacciones/{publicacion}
self.recuperarTodos = async function (req, res) {
    try {
        let data = await interaccion.findAll({
            where: { publicacionid: req.params.publicacion },
            attributes: ['id', 'valoracion', 'comentario', 'fecha', 'colaboradorid']
        })

        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// POST /api/interacciones
self.crear = async function (req, res) {
    try {
        const colaboradorExistente = await colaborador.findOne({ where: { id: req.body.colaboradorid }})
        const publicacionExistente = await publicacion.findOne({ where: { id: req.body.publicacionid }})

        if (colaboradorExistente && publicacionExistente) {
            const data = await interaccion.create({
                id: crypto.randomUUID(),
                valoracion: req.body.valoracion,
                comentario: req.body.comentario,
                fecha: req.body.fecha,
                colaboradorid: req.body.colaboradorid,
                publicacionid: req.body.publicacionid
            })
    
            if (data)
                return res.status(201).send()
            else
                return res.status(400).send()
        } else {
            return res.status(400).send()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// PUT /api/interacciones/{interaccion}
self.actualizar = async function (req, res) {
    try {
        let id = req.params.interaccion;
        let body = req.body;
        let data = await interaccion.update(body, { where: { id: id} });

        if (data[0] == 0)
            return res.status(404).send()
        else
            return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// DELETE /api/interacciones/{interaccion}
self.eliminar = async function (req, res) {
    try {
        const id = req.params.interaccion;
        let data = await interaccion.findOne({ where: { id: id } })

        data = await interaccion.destroy({ where: { id: id } })

        if (data === 1)
            return res.status(204).send()
        else
            return res.status(404).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = self;
