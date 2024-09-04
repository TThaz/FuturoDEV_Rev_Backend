'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('perguntas', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      questionarioId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'questionarios',
          key: 'id'
        },
        onUpdate: 'CASCADE', //Se alterado a tabela de onde procura do FK, altera apenas a coluna
        onDelete: 'CASCADE' //Se deletado a tabela de onde procura a FK, deleta toda a linha
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
  })},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('perguntas')
  }
};
