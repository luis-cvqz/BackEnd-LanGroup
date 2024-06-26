const Joi = require('joi');

const crearcolaborador = Joi.object({
  nombre: Joi.string().required().min(1).max(50),
  apellido: Joi.string().required().min(1).max(50),
  usuario: Joi.string().required().min(3).max(20),
  correo: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required(),
  contrasenia: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,16}$')).required(),
  descripcion: Joi.string().optional().min(1).max(200),
  icono: Joi.string().required().pattern(new RegExp('\\.png$')).min(1).max(50),
  rol: Joi.string().required().valid('Aprendiz', 'Administrador', 'Instructor').min(1).max(20),
});

const actualizarcolaborador = Joi.object({
  nombre: Joi.string().optional().min(1).max(50),
  apellido: Joi.string().optional().min(1).max(50),
  usuario: Joi.string().optional().min(1).max(50),
  correo: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).optional(),
  contrasenia: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,16}$')).optional(),
  descripcion: Joi.string().optional().min(1).max(50),
  icono: Joi.string().optional().pattern(new RegExp('\\.png$')).min(1).max(50),
  rolid: Joi.string().optional().min(1).max(255)
});

const actualizarrolcolaborador = Joi.object({
  rolid: Joi.string().required().min(1).max(255),
})

const creararchivomultimedia = Joi.object({
  publicacionid: Joi.string().required().min(1).max(255)
  /*file: Joi.object({
    filename: Joi.string().required().min(1).max(255),
    mimetype: Joi.string().required().min(1).max(50),
    size: Joi.number().required().min(1)
  }).required()*/
});

const creararchivomultimediavideo = Joi.object({
  publicacionid: Joi.string().required().min(1).max(255),
  nombre: Joi.string().required().min(1).max(255),
  mime: Joi.string().required().min(1).max(50),
  tamanio: Joi.string().required().min(1)
});

const iniciarsesion = Joi.object({
  correo: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required(),
  contrasenia: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,16}$')).required()
});

const enviarCorreo = Joi.object({
  to: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required(),
  subject: Joi.string().required().min(1).max(50),
  text: Joi.string().required().min(1).max(255)
});

const creargrupo = Joi.object({
  nombre: Joi.string().required().min(1).max(50),
  descripcion: Joi.string().required().min(1),
  icono: Joi.string().required().pattern(new RegExp('\\.png$')).min(1).max(50),
  idiomaid: Joi.string().required().min(1).max(255),
  colaboradorid: Joi.string().required().min(1).max(255),
  rol: Joi.string().required().valid('Aprendiz', 'Administrador').min(1).max(20)
});

const asignarColaboradorGrupo = Joi.object({
  colaboradorid: Joi.string().required().min(1).max(255),
  grupoid: Joi.string().required().min(1).max(255),
  rol: Joi.string().required().valid('Participante', 'Administrador').min(1).max(20),
});

const actualizargrupo = Joi.object({
  nombre: Joi.string().optional().min(1).max(50),
  descripcion: Joi.string().optional().min(1),
  icono: Joi.string().optional().pattern(new RegExp('\\.png$')).min(1).max(50),
  idiomaid: Joi.string().optional().min(1).max(255)
});

const idioma = Joi.object({
  nombre: Joi.string().required().min(1).max(20)
});

const crearinteraccion = Joi.object({
  valoracion: Joi.number().integer().required().min(1).max(5),
  comentario: Joi.string().required().min(1).max(500),
  colaboradorid: Joi.string().required().min(1).max(255),
  publicacionid: Joi.string().required().min(1).max(255)
})

const actualizarinteraccion = Joi.object({
  valoracion: Joi.number().integer().optional().min(1).max(5),
  comentario: Joi.string().optional().min(1).max(500),
  fecha: Joi.date().optional(),
  colaboradorid: Joi.string().optional().min(1).max(255),
  publicacionid: Joi.string().optional().min(1).max(255)
})

const crearpublicacion = Joi.object({
  titulo: Joi.string().required().min(1).max(50),
  descripcion: Joi.string().required().min(1).max(500),
  colaboradorid: Joi.string().required().min(1).max(255),
  grupoid: Joi.string().required().min(1).max(255)
});

const crearpublicacionimagen = Joi.object({
  titulo: Joi.string().required().min(1).max(50),
  descripcion: Joi.string().required().min(1).max(500),
  colaboradorid: Joi.string().required().min(1).max(36),
  grupoid: Joi.string().required().min(1).max(36),
  publicacionid: Joi.string().required().min(1).max(36)
})

const actualizarpublicacion = Joi.object({
  titulo: Joi.string().optional().min(1).max(50),
  descripcion: Joi.string().optional().min(1).max(500),
  fecha: Joi.date().optional(),
  colaboradorid: Joi.string().optional().min(1).max(255),
  grupoid: Joi.string().optional().min(1).max(255)
});

const crearsolicitud = Joi.object({
  contenido: Joi.string().required().min(1).max(500),
  motivo: Joi.string().required().min(1).max(500),
  constancia: Joi.string().required().min(1).max(500),
  colaboradorid: Joi.string().required().min(1).max(255),
  idiomaid: Joi.string().required().min(1).max(255),
  nombrearchivo: Joi.string().required().min(1).max(255),
  estado: Joi.string().required().min(1).max(50)
});

const actualizarsolicitud = Joi.object({
  contenido: Joi.string().optional().min(1).max(500),
  motivo: Joi.string().optional().min(1).max(500),
  estado: Joi.string().optional().min(1).max(25)
});

const obtenerSchemaPorTipo = (type) => {
  switch (type) {
    case 'crearcolaborador':
        return crearcolaborador;
    case 'actualizarcolaborador':
        return actualizarcolaborador;
    case 'actualizarrolcolaborador':
      return actualizarrolcolaborador;
    case 'creararchivomultimedia':
        return creararchivomultimedia;
    case 'creararchivomultimediavideo':
        return creararchivomultimediavideo;
    case 'iniciarsesion':
      return iniciarsesion;
    case 'enviarCorreo':
      return enviarCorreo;
    case 'creargrupo':
      return creargrupo;
    case 'actualizargrupo':
      return actualizargrupo;
    case 'idioma':
      return idioma;
    case 'crearinteraccion':
      return crearinteraccion;
    case 'actualizarinteraccion':
      return actualizarinteraccion;
    case 'crearpublicacion':
      return crearpublicacion;
    case 'crearpublicaionimagen':
      return crearpublicacionimagen;
    case 'actualizarpublicacion':
      return actualizarpublicacion;
    case 'crearsolicitud':
      return crearsolicitud;
    case 'actualizarsolicitud':
      return actualizarsolicitud;
    case 'asignarColaboradorGrupo':
      return asignarColaboradorGrupo;
    default:
        throw new Error('Objecto desconocido');
  }
};

module.exports = {
  obtenerSchemaPorTipo,
};