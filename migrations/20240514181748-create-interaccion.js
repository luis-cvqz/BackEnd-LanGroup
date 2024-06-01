"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("interaccion", {
      idinteraccion: {
=======
    await queryInterface.createTable('interaccion', {
      id: {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      valoracion: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      comentario: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      colaboradorid: {
        type: Sequelize.UUID,
        allowNull: false,
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
      publicacionid: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("interaccion");
  },
};
