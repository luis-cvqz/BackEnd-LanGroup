"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("rol", {
=======
    await queryInterface.createTable('rol', {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("rol");
  },
};
