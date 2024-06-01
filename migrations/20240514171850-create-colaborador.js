"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("colaborador", {
=======
    await queryInterface.createTable('colaborador', {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      contrasenia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      icono: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rolid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
<<<<<<< HEAD
          model: "rol",
          key: "id",
=======
          model: 'rol',
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
    await queryInterface.dropTable("colaborador");
  },
};
