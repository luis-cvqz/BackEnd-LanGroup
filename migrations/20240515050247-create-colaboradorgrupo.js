'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('colaboradorgrupo', {
      usuarioid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'colaborador',
          key: 'idusuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      grupoclave: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'grupo',
          key: 'clavegrupo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('colaboradorgrupo');
  }
};
