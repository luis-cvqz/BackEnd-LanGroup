'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('colaborador', {
      idusuario: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      contrasenia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      icono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rolid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'idrol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('colaborador');
  }
};