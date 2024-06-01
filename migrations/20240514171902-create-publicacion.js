"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("publicacion", {
      idpublicacion: {
=======
    await queryInterface.createTable('publicacion', {
      id: {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(1200),
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      colaboradorid: {
        allowNull: false,
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
      grupoid: {
        allowNull: false,
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
    await queryInterface.dropTable("publicacion");
  },
};
