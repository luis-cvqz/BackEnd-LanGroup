const { where } = require('sequelize');
const { rol, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Op = Sequelize.Op
let self = {}

// GET /api/roles/{nombre}
self.recuperar = async function (req, res){
    try{
        let nombre = req.params.nombre;
        
        let data = await rol.find(nombre, {
            attributes: [ 'id', 'nombre']
        })

        if(data)
            return res.status(200).json(data)
        else
        return res.status(404).json({ message: 'No se encontró el rol' })
    } catch (error){
        return res.status(500).json(error)
    }
}