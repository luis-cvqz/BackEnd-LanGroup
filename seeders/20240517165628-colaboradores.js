'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colaborador', [
      { idusuario:crypto.randomUUID(), usuario: 'langroupusuario', correo: 'zS21013868@estudiantes.uv.mx', contraseña: await bcrypt.hash('langroup', 10), nombre: 'Admin', apellido: 'Prueba', descripcion: 'admin de prueba', rol: 'Administrador', icono: 'icon1.png', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colaborador', null, {});
  }
};
