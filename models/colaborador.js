'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class colaborador extends Model {
    static associate(models) {
      colaborador.belongsToMany(models.idioma, { through: 'idiomacolaborador', foreignKey: 'usuarioid'});
      colaborador.belongsToMany(models.grupo, { through: 'colaboradorgrupo', foreignKey: 'usuarioid'});
    }
  }

  colaborador.init({
    idusuario: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'colaborador',
  });

  return colaborador;
};