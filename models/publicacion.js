'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publicacion extends Model {
    static associate(models) {
      publicacion.hasMany(models.archivopublicacion, { foreignKey: 'publicacionid' })
      publicacion.hasMany(models.interaccion, { foreignKey: 'publicacionid' })
      publicacion.belongsTo(models.colaborador)
      publicacion.belongsTo(models.grupo)
    }
  }
  publicacion.init(
    {
      idpublicacion: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
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
      grupoclave: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'publicacion',
    }
  );
  return publicacion;
};
