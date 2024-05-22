'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const roles = require('./20240517161501-roles')

const idColaboradorAdmin = crypto.randomUUID()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const idAdministrador = roles.idAdministrador

    await queryInterface.bulkInsert('colaborador', [
      { id: idColaboradorAdmin, usuario: 'langroupusuario', correo: 'zS21013868@estudiantes.uv.mx', contrasenia: await bcrypt.hash('langroup', 10), nombre: 'Admin', apellido: 'Prueba', descripcion: 'admin de prueba', icono: 'icon_perfil_1.png', rolid: idAdministrador, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {});
    await queryInterface.bulkDelete('colaborador', null, {});
  }, 

  idColaboradorAdmin
};
