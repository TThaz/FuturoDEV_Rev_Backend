require("dotenv").config();

const database = require("./database/config");
const express = require("express");

const usuarioRouter = require("./dominios/usuarios");
const questionarioRouter = require("./dominios/questionarios");
const sessionsRouter = require("./dominios/sessions");
const respostasRouter = require("./dominios/respostas");

const app = express();

app.use(express.json());

//Rotas de pergunta
app.use("/usuarios", usuarioRouter);

//Rotas questionário
app.use("/questionarios", questionarioRouter);

//Rota login
app.use("/sessions", sessionsRouter);

app.use("/respostas", respostasRouter);

async function iniciarServidor() {
    await database.authenticate();

    app.listen(3333, () => {
        console.log("Servidor rodando na porta 3333");
    });
}

iniciarServidor();
