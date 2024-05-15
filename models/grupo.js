'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grupo extends Model {
    static associate(models) {
      grupo.belongsTo(models.idioma);
      grupo.belongsToMany(models.colaborador, {  through: 'colaboradorgrupo', foreignKey: 'grupoclave' });
    }
  }
  grupo.init({
    clavegrupo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type:DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idiomaid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'grupo',
  });
  return grupo;
};