"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class colaborador extends Model {
    static associate(models) {
      colaborador.belongsToMany(models.idioma, {
        through: "idiomacolaborador",
        foreignKey: "usuarioid",
      });
      colaborador.belongsToMany(models.grupo, {
        through: "colaboradorgrupo",
        foreignKey: "usuarioid",
      });
      colaborador.hasMany(models.publicacion, { foreignKey: "usuarioid" });
      colaborador.hasMany(models.solicitud, { foreignKey: "usuarioid" });
    }
  }

  colaborador.init(
    {
      idusuario: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      contrasenia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      icono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rolid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "colaborador",
    }
  );

  return colaborador;
};
