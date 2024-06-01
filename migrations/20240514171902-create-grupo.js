"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("grupo", {
=======
    await queryInterface.createTable('grupo', {
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
      descripcion: {
        type: Sequelize.STRING(1200),
      },
      icono: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idiomaid: {
        type: Sequelize.UUID,
        allowNull: false,
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
    await queryInterface.dropTable("grupo");
  },
};
