const Joi = require('joi');

const crearcolaboradorSchema = Joi.object({
    nombre: Joi.string().required().min(1).max(50),
    apellido: Joi.string().required().min(1).max(50),
    usuario: Joi.string().required().min(3).max(20),
    correo: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required(),
    contrasenia: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,16}$')).required(),
    descripcion: Joi.string().optional().min(1).max(200),
    icono: Joi.string().required().pattern(new RegExp('\\.png$')).min(1).max(50),
    rol: Joi.string().required().valid('Aprendiz', 'Administrador', 'Instructor').min(1).max(20),
});

const actualizarcolaboradorSchema = Joi.object({
    nombre: Joi.string().optional().min(1).max(50),
    apellido: Joi.string().optional().min(1).max(50),
    usuario: Joi.string().optional().min(1).max(50),
    correo: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).optional(),
    contrasenia: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$')).optional(),
    descripcion: Joi.string().optional().min(1).max(50),
    icono: Joi.string().optional().pattern(new RegExp('\\.png$')).min(1).max(50),
    rol: Joi.string().optional().valid('Aprendiz', 'Administrador', 'Instructor').min(1).max(20),
});

const obtenerSchemaPorTipo = (type) => {
  switch (type) {
    case 'crearcolaborador':
        return crearcolaboradorSchema;
    case 'actualizarcolaborador':
        return actualizarcolaboradorSchema;
    default:
        throw new Error('Objecto desconocido');
  }
};

module.exports = {
  obtenerSchemaPorTipo,
};