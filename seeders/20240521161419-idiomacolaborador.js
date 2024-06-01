<<<<<<< HEAD
"use strict";
const colaboradores = require("./20240517165628-colaboradores");
const idiomas = require("./20240517164303-idiomas");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const idColaboradorAdministrador = colaboradores.idColaboradorAdmin;

    const idEspanol = idiomas.idEspanol;
    const idIngles = idiomas.idIngles;
    const idFrances = idiomas.idFrances;

    await queryInterface.bulkInsert("idiomacolaborador", [
      {
        colaboradorid: idColaboradorAdministrador,
        idiomaid: idEspanol,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        colaboradorid: idColaboradorAdministrador,
        idiomaid: idIngles,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        colaboradorid: idColaboradorAdministrador,
        idiomaid: idFrances,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
=======
'use strict';
const colaboradores = require('./20240517161502-colaboradores')
const idiomas = require('./20240517161503-idiomas')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const idColaboradorAdministrador = colaboradores.idColaboradorAdmin

    const idEspanol = idiomas.idEspanol
    const idIngles = idiomas.idIngles
    const idFrances = idiomas.idFrances

    await queryInterface.bulkInsert('idiomacolaborador', [
      { colaboradorid: idColaboradorAdministrador, idiomaid: idEspanol, createdAt: new Date(), updatedAt: new Date() },
      { colaboradorid: idColaboradorAdministrador, idiomaid: idIngles, createdAt: new Date(), updatedAt: new Date() },
      { colaboradorid: idColaboradorAdministrador, idiomaid: idFrances, createdAt: new Date(), updatedAt: new Date() },
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("idiomacolaborador", null, {});
  },
};
