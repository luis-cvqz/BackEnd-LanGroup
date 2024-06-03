"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class publicacion extends Model {
    static associate(models) {
      publicacion.hasMany(models.archivomultimedia, {
        foreignKey: "publicacionid",
      });
      publicacion.hasMany(models.interaccion, { foreignKey: "publicacionid" });
      publicacion.belongsTo(models.colaborador);
      publicacion.belongsTo(models.grupo);
    }
  }
  publicacion.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      colaboradorid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grupoid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "publicacion",
    }
  );
  return publicacion;
};
