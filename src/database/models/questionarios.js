const Sequelize = require("sequelize");
const database = require("../config");

const Questionarios = database.define(
    "questionarios",
    {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        descricao: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        scopes: {
            carregarPerguntas: {
                include: ["perguntas"],
            },
        },
    }
);

const Perguntas = database.define("perguntas", {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    questionarioId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: "questionarios",
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

Questionarios.hasMany(Perguntas, {
    foreignKey: "questionarioId",
    as: "perguntas",
});

Perguntas.belongsTo(Questionarios, {
    foreignKey: "questionarioId",
});

module.exports = {
    Questionarios,
    Perguntas,
};
