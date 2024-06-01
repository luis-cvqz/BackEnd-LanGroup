'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const idAdministrador = crypto.randomUUID()
const idInstructor = crypto.randomUUID()
const idAprendiz = crypto.randomUUID()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rol', [
      { id: idAdministrador, nombre: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
      { id: idInstructor, nombre: 'Instructor', createdAt: new Date(), updatedAt: new Date() },
      { id: idAprendiz, nombre: 'Aprendiz', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {});
  },

  idAdministrador,
  idInstructor,
  idAprendiz
};
