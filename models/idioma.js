'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class idioma extends Model {
    static associate(models) {
      idioma.belongsToMany(models.colaborador, {  through: 'idiomacolaborador', foreignKey: 'idiomaid' });
    }
  }

  idioma.init({
    ididioma: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'idioma',
  });

  return idioma;
};