'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class archivomultimedia extends Model {
    static associate(models) {
      archivomultimedia.belongsTo(models.publicacion)
    }
  }
  archivomultimedia.init({
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
    modelName: 'archivomultimedia',
  });
  return archivomultimedia;
};