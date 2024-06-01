"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    static associate(models) {
      rol.hasMany(models.colaborador, { foreignKey: "rolid" });
    }
  }
<<<<<<< HEAD

  rol.init(
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
=======
  
  rol.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "rol",
    }
  );

  return rol;
};
