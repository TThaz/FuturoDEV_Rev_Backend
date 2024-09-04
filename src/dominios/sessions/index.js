const { Router } = require("express");
const yup = require("yup");

const { validarSchema } = require("../../middlewares/validaRotas");
const SessionsController = require("./sessions.controllers");

const sessionsRouter = new Router();
const sessionsControllers = new SessionsController();

const schemaPostSessions = yup.object({
    body: yup.object({
        email: yup
            .string()
            .email("Email no formato inválido")
            .required("Email é obrigatório"),
        senha: yup.string().required("Senha é obrigatório"),
    }),
});

sessionsRouter.post(
    "/",
    validarSchema(schemaPostSessions),
    sessionsControllers.create
);

module.exports = sessionsRouter;
