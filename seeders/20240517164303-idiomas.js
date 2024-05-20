'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('idioma', [
      { ididioma:crypto.randomUUID(), nombre: 'Español', createdAt: new Date(), updatedAt: new Date() },
      { ididioma:crypto.randomUUID(), nombre: 'Inglés', createdAt: new Date(), updatedAt: new Date() },
      { ididioma:crypto.randomUUID(), nombre: 'Francés', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('idioma', null, {});
  }
};
