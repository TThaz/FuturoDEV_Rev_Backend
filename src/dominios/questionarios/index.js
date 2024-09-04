const { Router } = require("express");
const yup = require("yup");

const QuestionariosControllers = require("./questionarios.controllers");
const { validarSchema } = require("../../middlewares/validaRotas");
const {
    autorizaLogin,
    garantirAutenticacaoRBAC,
} = require("../../middlewares/autorizationLogin");

const questionarioRouter = new Router();
const questionariosControllers = new QuestionariosControllers();

//VALIDAÇÕES
const schemaPostQuestionario = yup.object({
    body: yup.object({
        titulo: yup.string().required("Título é obrigatório"),
        descricao: yup.string().required("Descrição é obrigatório"),
        perguntas: yup.array(
            yup.object({
                descricao: yup
                    .string()
                    .required("Descrição da pergunta é obrigatório"),
            })
        ),
    }),
});

const schemaDeleteQuestionario = yup.object({
    params: yup.object({
        id: yup.string().uuid("ID informado não é válido").required(),
    }),
});

//ROTAS
questionarioRouter.use(garantirAutenticacaoRBAC("criador")); // Middleware de autorização para login

questionarioRouter.get("/", questionariosControllers.index);

questionarioRouter.post(
    "/",
    validarSchema(schemaPostQuestionario),
    questionariosControllers.create
);

questionarioRouter.delete(
    "/:id",
    validarSchema(schemaDeleteQuestionario),
    questionariosControllers.delete
);

module.exports = questionarioRouter;
