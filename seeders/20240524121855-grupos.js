"use strict";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const idiomas = require('./20240517161503-idiomas')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const idIngles = idiomas.idIngles;

    await queryInterface.bulkInsert("grupo", [
      {
        id: crypto.randomUUID(),
        nombre: "Grupo Inglés IV",
        icono: "icono_1.png",
        idiomaid: idIngles,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("grupo", null, {});
  },
};
