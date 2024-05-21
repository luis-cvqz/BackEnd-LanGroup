'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitud', {
      idsolicitud: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      contenido: {
        type: Sequelize.STRING(1200),
        allowNull: false
      },
      motivo: {
        type: Sequelize.STRING(1200),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      constancia: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      colaboradorid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'colaborador',
          key: 'id'
        }
      },
      idiomaid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'idioma',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('solicitud');
  }
};