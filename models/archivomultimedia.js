"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class archivomultimedia extends Model {
    static associate(models) {
      archivomultimedia.belongsTo(models.publicacion);
    }
  }
<<<<<<< HEAD
  archivomultimedia.init(
    {
      idarchivo: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      publicacionid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tamanio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      indb: {
        type: DataTypes.BOOLEAN, // Corrección aquí
        defaultValue: true,
        allowNull: false,
      },
      archivo: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "archivomultimedia",
=======
  archivomultimedia.init({
    id: {
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
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    archivo: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
    }
  );
  return archivomultimedia;
};
