"use strict";
const { Model } = require("sequelize");
<<<<<<< HEAD

=======
>>>>>>> main
module.exports = (sequelize, DataTypes) => {
  class grupo extends Model {
    static associate(models) {
      grupo.belongsTo(models.idioma);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> main
      grupo.belongsToMany(models.colaborador, {
        through: "colaboradorgrupo",
        foreignKey: "grupoid",
      });
      grupo.hasMany(models.publicacion, { foreignKey: "grupoid" });
<<<<<<< HEAD
    }
  }

  grupo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generar un UUID automáticamente
        primaryKey: true,
      },
      nombre: {
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
      idiomaid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
=======
    }
  }
  grupo.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
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
      idiomaid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
=======
      grupo.belongsToMany(models.colaborador, {  through: 'colaboradorgrupo', foreignKey: 'grupoid' });
      grupo.hasMany(models.publicacion, { foreignKey: 'grupoid'});
    }
  }
  grupo.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
>>>>>>> main
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "grupo",
    }
  );
<<<<<<< HEAD

=======
>>>>>>> main
  return grupo;
};

