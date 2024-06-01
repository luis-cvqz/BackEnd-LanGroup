"use strict";
const { Model } = require("sequelize");
<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  class interaccion extends Model {
    static associate(models) {
      interaccion.belongsTo(models.colaborador);
      interaccion.belongsTo(models.publicacion);
=======

module.exports = (sequelize, DataTypes) => {
  class interaccion extends Model {
    static associate(models) {
<<<<<<< HEAD
      interaccion.belongsTo(models.colaborador, {
        foreignKey: "usuarioid",
        targetKey: "idusuario",
      });
      interaccion.belongsTo(models.publicacion, {
        foreignKey: "publicacionid",
        targetKey: "id", // Asumiendo que publicacion tiene un campo id como primary key
      });
    }
  }

  interaccion.init(
    {
      idinteraccion: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      valoracion: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usuarioid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publicacionid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "interaccion",
=======
      interaccion.belongsTo(models.colaborador)
      interaccion.belongsTo(models.publicacion)
>>>>>>> main
    }
  }
  interaccion.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      valoracion: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      comentario: {
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
      publicacionid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
<<<<<<< HEAD
    {
      sequelize,
      freezeTableName: true,
      modelName: "interaccion",
    }
  );
=======
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
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
    }
  );

>>>>>>> main
  return interaccion;
};

