"use strict";
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rol", [
      {
        id: crypto.randomUUID(),
        nombre: "Grupo Inglés IV",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("grupo", null, {});
  },
};
