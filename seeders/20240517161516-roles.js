'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rol', [
      { idrol: crypto.randomUUID(), nombre: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
      { idrol: crypto.randomUUID(), nombre: 'Instructor', createdAt: new Date(), updatedAt: new Date() },
      { idrol: crypto.randomUUID(), nombre: 'Aprendiz', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {});
  }
};
