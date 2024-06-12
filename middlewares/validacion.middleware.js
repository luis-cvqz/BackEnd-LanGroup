const Joi = require('joi');
const { obtenerSchemaPorTipo } = require('../services/validaciones.service');
const logger = require('../logger/logger'); 

const ValidarObjeto = (type) => {
  return async (req, res, next) => {
    try {
        const schema = obtenerSchemaPorTipo(type);
        await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
        logger.error(`Validación fallida: ${error.message}`);
        return res.status(400).json({ message: 'Validación fallida'});
    }
  };
};

module.exports = ValidarObjeto;