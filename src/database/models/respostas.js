const Sequelize = require("sequelize");
const database = require("../config");

const Respostas = database.define("respostas", {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    conteudo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    perguntaId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: "perguntas",
            key: "id",
        },
        onUpdate: "CASCADE", //Se alterado a tabela de onde procura do FK, altera apenas a coluna
        onDelete: "CASCADE", //Se deletado a tabela de onde procura a FK, deleta toda a linha
    },
    usuarioId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id",
        },
        onUpdate: "CASCADE", //Se alterado a tabela de onde procura do FK, altera apenas a coluna
        onDelete: "CASCADE", //Se deletado a tabela de onde procura a FK, deleta toda a linha
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = {
    Respostas,
};
