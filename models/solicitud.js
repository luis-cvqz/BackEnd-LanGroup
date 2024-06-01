'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solicitud extends Model {
    static associate(models) {
      solicitud.belongsTo(models.colaborador);
      solicitud.belongsTo(models.idioma);
    }
  }
  solicitud.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    constancia: {
      type: DataTypes.BLOB("long"),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    colaboradorid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idiomaid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'solicitud',
  });
  return solicitud;
};