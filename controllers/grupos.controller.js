const { colaborador, grupo, idioma, Sequelize } = require("../models");
const crypto = require("crypto");
const Op = Sequelize.Op;
const logger = require("../services/logger.service");
const Acciones = require('../enums/acciones.enum');

let self = {};

// GET /api/grupos
self.recuperarTodos = async function (req, res) {
  try {
    const { colaboradorid, rol } = req.query;
    let options = {
      attributes: [
        ['id', 'grupoId'],
        'nombre',
        'descripcion',
        'icono',
        'idiomaid'
      ],
      subQuery: false
    };

    if (colaboradorid && rol) {
      options.include = [{
        model: colaborador,
        attributes: [],
        through: {
          attributes: [],
          where: { colaboradorid: colaboradorid, rol: rol }
        },
        required: true
      }];
    } else if (colaboradorid) {
      options.include = [{
        model: colaborador,
        attributes: [],
        through: {
          attributes: [],
          where: { colaboradorid: colaboradorid }
        },
        required: true
      }];
    } else if (rol) {
      options.include = [{
        model: colaborador,
        attributes: [],
        through: {
          attributes: [],
          where: { rol: rol }
        },
        required: true
      }];
    }

    let data = await grupo.findAll(options);

    if (data)
      return res.status(200).json(data);
    else
      return res.status(404).send();
  } catch (error) {
    logger.error(`Error al recuperar los grupos: ${error}`);
    return res.status(500).send();
  }
};

//
self.recuperarGruposPorColaborador = async function (req, res) {
  try {
    const { colaboradorid } = req.params;

    if (!colaboradorid) {
      return res.status(400).json({ error: "El id del colaborador es requerido" });
    }

    let data = await grupo.findAll({
      include: [
        {
          model: colaborador,
          where: { id: colaboradorid },
          attributes: [], // No necesitamos los atributos del colaborador en el resultado final
          through: { attributes: [] }
        },
        {
          model: idioma,
          attributes: ['id', 'nombre']
        }
      ],
      attributes: [
        ['id', 'grupoId'],
        'nombre',
        'descripcion',
        'icono',
        'idiomaid'
      ],
    });

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "No se encontraron grupos para el colaborador dado" });
    }
  } catch (error) {
    logger.error(`Error al recuperar los grupos por colaborador: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// GET /api/grupos/{id}
self.recuperarPorId = async function (req, res) {
  try {
    let id = req.params.id;
    let data = await grupo.findByPk(id, {
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaid",
      ],
    });
    if (data) {
      return res.status(200).json(data);
    } else {
      logger.error(`Grupo con id ${id} no encontrado.`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
    return res.status(500).send();
  }
};

// GET /api/grupos/idioma/{idiomaId}
self.recuperarPorIdioma = async function (req, res) {
  try {
    let id = req.params.idiomaId;
    let data = await grupo.findAll({
      where: { idiomaid: id },
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaid",
      ],
    });
    if (data) {
      return res.status(200).json(data);
    } else {
      logger.error(`No se encontro el grupo con el ${id}`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
    return res.status(500).send();
  }
};

// GET /api/grupos/idioma/{idiomaNombre}
self.recuperarPorIdiomaNombre = async function (req, res) {
  try {
    let idiomaNombre = req.params.idiomaNombre;

    let idiomaData = await idioma.findOne({
      where: { nombre: idiomaNombre },
    });

    if (!idiomaData) {
      return res.status(404).send({ message: "Idioma no encontrado" });
    }

    let data = await grupo.findAll({
      where: { idiomaid: idiomaData.id },
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaid",
      ],
      include: [
        {
          model: idioma,
          attributes: ["nombre"],
        },
      ],
    });

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      logger.error(`Grupo con id ${id} no encontrado.`);
      return res.status(404).send({ message: "No se encontraron grupos para el idioma dado" });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
    return res.status(500).send();
  }
};

// POST /api/grupos
self.agregarGrupo = async function (req, res) {
  try {
    const { nombre, descripcion, icono, idiomaid, colaboradorid, rol } = req.body;

    // Validar que los campos requeridos están presentes
    if (!nombre || !icono || !idiomaid || !colaboradorid || !rol) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que el idiomaid exista en la tabla idioma
    const idiomaExistente = await idioma.findByPk(idiomaid);
    if (!idiomaExistente) {
      return res.status(404).json({ error: "El idioma no existe" });
    }

    const nuevoGrupo = {
      id: crypto.randomUUID(),
      nombre: nombre,
      descripcion: descripcion,
      icono: icono,
      idiomaid: idiomaid,
    };

    const grupoCreado = await grupo.create(nuevoGrupo);

    if (grupoCreado) {
      req.bitacora(`grupos${Acciones.CREAR}`, nuevoGrupo.id);
      console.log("Grupo creado con ID:", grupoCreado.id);

      // Asignar colaborador al grupo creado
      const asignarReq = {
        body: {
          colaboradorid: colaboradorid,
          grupoid: grupoCreado.id,
          rol: rol,
        }
      };

      const asignarRes = {
        status: (code) => ({
          json: (data) => ({ code, data })
        }),
        json: (data) => data
      };

      const asignarResult = await self.asignarColaboradorAGrupo(asignarReq, asignarRes);

      if (asignarResult.code !== 201) {
        return res.status(asignarResult.code).json(asignarResult.data);
      }

      return res.status(201).json(grupoCreado);
    } else {
      logger.error(`No se pudo crear el grupo.`);
      return res.status(405).send();
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`);
    return res.status(500).send();
  }
};


// PUT /api/grupos/{id}
self.actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    let grupoExistente = await grupo.findByPk(id);

    if (!grupoExistente) {
      logger.error(`Grupo con id ${id} no encontrado.`);
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    let data = await grupoExistente.update(req.body);

    if (data[0] == 0)
      return res.status(400).send();
    else {
      req.bitacora(`grupos${Acciones.EDITAR}`, id)
      return res.status(204).json(grupoExistente);
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send();
  }
};

// DELETE /api/grupos/{id}
self.eliminarGrupo = async function (req, res) {
  try {
    let id = req.params.id;
    let deletedRows = await grupo.destroy({ where: { id: id } });

    if (deletedRows > 0) {
      req.bitacora(`grupos${Acciones.ELIMINAR}`, id)
      return res.status(204).send();
    } else {
      logger.error(`Grupo con id ${id} no encontrado.`); 
      return res.status(404).send({ message: "Grupo no encontrado" });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error}`); 
    return res.status(500).send();
  }
};

// POST /api/grupos/colaborador
self.asignarColaboradorAGrupo = async function (req, res) {
  try {
    const { colaboradorid, grupoid, rol } = req.body;

    if (!colaboradorid || !grupoid || !rol) {
      return res.status(400).json({ error: "colaboradorid, grupoid y rol son requeridos" });
    }

    const grupoExistente = await grupo.findByPk(grupoid);
    if (!grupoExistente) {
      return res.status(404).json({ error: "El grupo no existe" });
    }

    const colaboradorExistente = await colaborador.findByPk(colaboradorid);
    if (!colaboradorExistente) {
      return res.status(404).json({ error: "El colaborador no existe" });
    }

    await grupoExistente.addColaborador(colaboradorExistente, { through: { rol: rol } });
    return res.status(201).json({ message: "Colaborador asignado al grupo exitosamente" });
  } catch (error) {
    logger.error(`Error al asignar colaborador al grupo: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor"});
  }
};

module.exports = self;