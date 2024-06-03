'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitud', {
      id: {
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
        allowNull: false,
        defaultValue: 'Pendiente'
      },
      constancia: {
        type: Sequelize.BLOB('long'),
        allowNull: true
      },
      nombrearchivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      colaboradorid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'colaborador',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idiomaid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'idioma',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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