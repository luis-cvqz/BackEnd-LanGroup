"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("archivomultimedia", {
=======
    await queryInterface.createTable('archivomultimedia', {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      publicacionid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tamanio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      indb: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      archivo: {
<<<<<<< HEAD
        type: Sequelize.BLOB,
        allowNull: false,
        defaultValue: false,
=======
        type: Sequelize.BLOB('long'),
        allowNull: true,
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("archivomultimedia");
  },
};
