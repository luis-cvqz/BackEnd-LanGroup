'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('archivomultimedia', {
      idarchivo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      publicacionid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tamanio: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      indb: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      archivo: {
        type: Sequelize.BLOB,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('archivomultimedia');
  }
};