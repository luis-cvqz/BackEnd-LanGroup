'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class archivopublicacion extends Model {
    static associate(models) {
      archivopublicacion.belongsTo(models.publicacion)
    }
  }
  archivopublicacion.init({
    idarchivo: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    publicacionid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tamanio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    indb: {
      type: DataTypes.BOOEAN,
      defaultValue: true,
      allowNull: false
    },
    archivo: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'archivopublicacion',
  });
  return archivopublicacion;
};