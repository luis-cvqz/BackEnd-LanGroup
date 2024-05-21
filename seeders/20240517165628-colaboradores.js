'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colaborador', [
      { idusuario:crypto.randomUUID(), usuario: 'langroupusuario', correo: 'zS21013868@estudiantes.uv.mx', contrasenia: await bcrypt.hash('langroup', 10), nombre: 'Admin', apellido: 'Prueba', descripcion: 'admin de prueba', icono: 'icon_perfil_1.png', rolid: '1daf54ff-d0b4-426a-8019-e99956f28656', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colaborador', null, {});
  }
};
