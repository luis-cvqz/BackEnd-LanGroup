'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('interaccions', {
      idinteraccion: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      valoracion: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      usuarioid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'colaborador',
            key: 'idcolaborador'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      publicacionid: {
        type: Sequelize.UUID,
        allowNull: false
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
    await queryInterface.dropTable('interaccions');
  }
};