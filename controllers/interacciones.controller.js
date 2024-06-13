const { publicacion, interaccion, colaborador } = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const logger = require('../services/logger.service'); 
const Acciones = require('../enums/acciones.enum');

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
            logger.error(`No se encontraron interacciones para la publicación ${req.params.publicacion}`); // Log para indicar que no se encontraron interacciones
            return res.status(404).send()
        }
    } catch (error) {
        logger.error(`Error interno del servidor: ${error}`); 
        return res.status(500).send();
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
    
            if (data) {
                req.bitacora(`interacciones${Acciones.CREAR}`, data.id)
                return res.status(201).send()
            }
            else {
                logger.error(`Error al crear la interacción`); 
                return res.status(500).send()
            }
        } else {
            logger.error(`Colaborador o publicación no encontrados`); 
            return res.status(400).send()
        }
    } catch (error) {
        logger.error(`Error interno del servidor: ${error}`); 
        return res.status(500).send();
    }
}

// PUT /api/interacciones/{interaccion}
self.actualizar = async function (req, res) {
    try {
        let id = req.params.interaccion;
        let body = req.body;
        let data = await interaccion.update(body, { where: { id: id} });

        if (data[0] == 0){
            return res.status(400).send();
        }
        else {
            req.bitacora(`interacciones${Acciones.EDITAR}`, id)
            return res.status(204).send()
        }
    } catch (error) {
        logger.error(`Error interno del servidor: ${error}`); 
        return res.status(500).send();
    }
}

// DELETE /api/interacciones/{interaccion}
self.eliminar = async function (req, res) {
    try {
        const id = req.params.interaccion;
        let data = await interaccion.findOne({ where: { id: id } })

        data = await interaccion.destroy({ where: { id: id } })

        if (data === 1) {
            req.bitacora(`interacciones${Acciones.ELIMINAR}`, id)
            return res.status(204).send()
        }
        else {
            return res.status(404).send()
        }
    } catch (error) {
        logger.error(`Error interno del servidor: ${error}`); 
        return res.status(500).send();
    }
}

module.exports = self;
