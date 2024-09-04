"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("usuarios", "permissao", {
            type: Sequelize.ENUM(["criador", "usuario"]),
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("usuarios", "permissao");
    },
};
