'use strict';

const idEspanol = crypto.randomUUID()
const idIngles = crypto.randomUUID()
const idFrances = crypto.randomUUID()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('idioma', [
      { id:crypto.randomUUID(), nombre: 'Español', createdAt: new Date(), updatedAt: new Date() },
      { id:crypto.randomUUID(), nombre: 'Inglés', createdAt: new Date(), updatedAt: new Date() },
      { id:crypto.randomUUID(), nombre: 'Francés', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('idioma', null, {});
  },
  
  idEspanol,
  idIngles,
  idFrances
};
