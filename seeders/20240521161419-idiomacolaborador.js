'use strict';
const colaboradores = require('./20240517161502-colaboradores')
const idiomas = require('./20240517161503-idiomas')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const idColaboradorAdministrador = colaboradores.idColaboradorAdministrador

    const idEspanol = idiomas.idEspanol
    const idIngles = idiomas.idIngles
    const idFrances = idiomas.idFrances

    await queryInterface.bulkInsert('idiomacolaborador', [
      { colaboradorid: idColaboradorAdministrador, idiomaid: idEspanol, createdAt: new Date(), updatedAt: new Date() },
      { colaboradorid: idColaboradorAdministrador, idiomaid: idIngles, createdAt: new Date(), updatedAt: new Date() },
      { colaboradorid: idColaboradorAdministrador, idiomaid: idFrances, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('idiomacolaborador', null, {});
  }
};
