const { grupo, Sequelize } = require("../models");
const crypto = require("crypto");
const Op = Sequelize.Op;

let self = {};

// GET /api/grupos/{id}
self.recuperar = async function (req, res) {
  try {
    const id = req.params.id;

    let data = await grupo.findByPk(id, {
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaId",
      ],
      subQuery: false
    });

    if (data) return res.status(200).json(data);
    else return res.status(404).send();
  } catch (error) {
    return res.status(500).json(error);
  }
};

// GET /api/grupos/{idioma}
self.recuperarPorIdIdioma = async function (req, res) {
  try {
    const id = req.params.idiomaId;

    let data = await grupo.findByPk(id, {
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaId",
      ],
      subQuery: false
    });

    if (data) return res.status(200).json(data);
    else return res.status(404).send();
  } catch (error) {
    return res.status(500).json(error);
  }

// POST /api/grupos

// PUT /api/grupos/{id}

// DELETE /api/grupos/{id}

// GET /api/grupos
self.recuperarTodos = async function (req, res) {
  try {
    let data = await grupo.findAll({
      attributes: [
        ["id", "grupoId"],
        "nombre",
        "descripcion",
        "icono",
        "idiomaId",
      ],
      subQuery: false
    });

    if (data) return res.status(200).json(data);
    else return res.status(404).send();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = self;
