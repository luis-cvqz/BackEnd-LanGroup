const { where } = require('sequelize');
const { colaborador, rol, Sequelize } = require('../models');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const logger = require('../logger/logger'); // Agregar el logger
const crypto = require('crypto'); // Se añade la importación de crypto para generar UUID

let self = {};

// GET /api/colaboradores/{correo}
self.recuperar = async function (req, res) {
  try {
    let data = await colaborador.findOne({
      where: { correo: req.params.correo },
      attributes: [
        ['id', 'colaboradorId'],
        'usuario',
        'nombre',
        'apellido',
        'correo',
        'descripcion',
        'rolid',
        'icono',
      ],
    });
    if (data) {
      return res.status(200).json(data);
    } else {
      logger.error(`Colaborador con correo ${req.params.correo} no encontrado.`); 
      return res.status(404).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json(error);
  }
};

// GET /api/colaboradores?rol=r
self.recuperarTodos = async function (req, res) {
  try {
    let filtros = {};

    if (req.query.rol != null) {
      let rolusuario = await rol.findOne({
        where: { nombre: req.query.rol },
        attributes: ['id'],
      });

      if (rolusuario) {
        filtros.rolid = rolusuario.id;
      } else {
        logger.error(`Rol ${req.query.rol} no encontrado.`);
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
    }

    let data = await colaborador.findAll({
      where: filtros,
      attributes: [['id', 'colaboradorId'], 'usuario', 'nombre', 'apellido', 'correo', 'descripcion', 'rolid', 'icono'],
      subQuery: false
    })

    if (data)
      return res.status(200).json(data)
    else
      return res.status(404).send()
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json(error);
  }
}

// POST /api/colaboradores
self.crear = async function (req, res) {
  try {
    if (req.body != null) {
      const rolusuario = await rol.findOne({ where: { nombre: req.body.rol }})
      if (!rolusuario) {
        logger.error(`Rol ${req.body.rol} no encontrado.`);
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      const correoExistente = await colaborador.findOne({ where: { correo: req.body.correo } })

      if (!correoExistente) {
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

        req.bitacora(`colaboradores.crear`, data.id)
        return res.status(201).send()
      } else {
        return res.status(400).json({ message: "Correo duplicado"})
      }            
    } else {
      return res.status(400).json({ message: "Información requerida"})
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json(error);
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
      req.bitacora(`colaboradores.editar`, id)
      return res.status(204).send()
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`); 
    return res.status(500).json(error);
  }
}

module.exports = self;
