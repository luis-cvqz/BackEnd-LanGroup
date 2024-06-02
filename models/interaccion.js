'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class interaccion extends Model {
    static associate(models) {
      interaccion.belongsTo(models.colaborador)
      interaccion.belongsTo(models.publicacion)
    }
  }
  interaccion.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    valoracion: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    colaboradorid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicacionid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'interaccion',
  });
  return interaccion;
};