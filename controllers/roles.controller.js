const { where } = require('sequelize');
const { rol } = require('../models')
let self = {}

// GET /api/roles/{id}
self.recuperar = async function (req, res){
    try{
        let id = req.params.id;
        
        let data = await rol.findByPk(id, {
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

// GET /api/roles/
self.recuperarTodos = async function (req, res){
    try{
        let data = await rol.findAll({
            attributes: ['id', 'nombre'],
            subQuery: false
        })

        if(data)
            return res.status(200).json(data)
        else
        return res.status(404).send()

    }catch(error){
        return res.status(500).json(error)
    }
}

module.exports = self