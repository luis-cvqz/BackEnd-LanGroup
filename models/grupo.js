"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grupo extends Model {
    static associate(models) {
      grupo.belongsTo(models.idioma);
<<<<<<< HEAD
      grupo.belongsToMany(models.colaborador, {
        through: "colaboradorgrupo",
        foreignKey: "grupoid",
      });
      grupo.hasMany(models.publicacion, { foreignKey: "grupoid" });
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
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "grupo",
    }
  );
  return grupo;
};
