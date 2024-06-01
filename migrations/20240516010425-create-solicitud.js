"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable("colaboradorgrupo", {
      colaboradorid: {
        allowNull: false,
        primaryKey: true,
=======
    await queryInterface.createTable('solicitud', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      contenido: {
        type: Sequelize.STRING(1200),
        allowNull: false
      },
      motivo: {
        type: Sequelize.STRING(1200),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Pendiente'
      },
      constancia: {
        type: Sequelize.BLOB('long'),
        allowNull: true
      },
      nombrearchivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      colaboradorid: {
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
        type: Sequelize.UUID,
        references: {
<<<<<<< HEAD
          model: "colaborador",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
=======
          model: 'colaborador',
          key: 'id'
        }
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
      },
      grupoid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
<<<<<<< HEAD
          model: "grupo",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING,
=======
          model: 'idioma',
          key: 'id'
        }
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
    await queryInterface.dropTable("colaboradorgrupo");
  },
};
