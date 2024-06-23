"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class colaboradorgrupo extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }

  colaboradorgrupo.init(
    {
      colaboradorid: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      grupoid: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "colaboradorgrupo",
      freezeTableName: true,
    }
  );

  return colaboradorgrupo;
};