'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('idiomacolaborador', [
      { usuarioid: 'c22458d7-ee89-418c-a8c6-2f4560b6c033', idiomaid: '3032201a-8987-43cc-b75c-d0504e29e168', createdAt: new Date(), updatedAt: new Date() },
      { usuarioid: 'c22458d7-ee89-418c-a8c6-2f4560b6c033', idiomaid: '3189de50-e1fa-4093-850a-bf6e93a655fa', createdAt: new Date(), updatedAt: new Date() },
      { usuarioid: 'c22458d7-ee89-418c-a8c6-2f4560b6c033', idiomaid: 'fd29982d-524c-45e2-94d9-e747b4ca03d2', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('idiomacolaborador', null, {});
  }
};
