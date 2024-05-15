'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grupo', {
      clavegrupo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      icono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idiomaid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'idioma',
          key: 'ididioma'
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
    await queryInterface.dropTable('grupo');
  }
};