"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
<<<<<<< HEAD
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("idiomacolaborador", {
=======
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('idiomacolaborador', {
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idiomaid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
<<<<<<< HEAD
          model: "idioma",
          key: "id",
=======
          model: 'idioma',
          key: 'id'
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("idiomacolaborador");
  },
};
