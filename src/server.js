require("dotenv").config();

const database = require("./database/config");
const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./dominios/doc.swagger.json");

const usuarioRouter = require("./dominios/usuarios");
const questionarioRouter = require("./dominios/questionarios");
const sessionsRouter = require("./dominios/sessions");
const respostasRouter = require("./dominios/respostas");

const { garantirAutenticacaoRBAC } = require("./middlewares/autorizationLogin");

const app = express();
app.use(express.json());

//Rota do Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rotas de pergunta
app.use("/usuarios", usuarioRouter);

//Rotas questionário
app.use(
    "/questionarios",
    garantirAutenticacaoRBAC("criador"),
    questionarioRouter
);

//Rota login
app.use("/sessions", sessionsRouter);

//Rota respostas
app.use("/respostas", garantirAutenticacaoRBAC("usuario"), respostasRouter);

async function iniciarServidor() {
    await database.authenticate();

    app.listen(3333, () => {
        console.log("Servidor rodando na porta 3333");
    });
}

iniciarServidor();
