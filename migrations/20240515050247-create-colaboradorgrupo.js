"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
<<<<<<< HEAD
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("colaboradorgrupo", {
=======
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('colaboradorgrupo', {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
      colaboradorid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
<<<<<<< HEAD
          model: "colaborador",
          key: "id",
=======
          model: 'colaborador',
          key: 'id'
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      grupoid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
<<<<<<< HEAD
          model: "grupo",
          key: "id",
=======
          model: 'grupo',
          key: 'id'
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("colaboradorgrupo");
  },
};
