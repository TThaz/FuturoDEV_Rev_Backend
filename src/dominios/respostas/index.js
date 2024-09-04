const { Router } = require("express");
const yup = require("yup");

const RespostasControllers = require("./respostas.controllers");
const { validarSchema } = require("../../middlewares/validaRotas");
const {
    garantirAutenticacaoRBAC,
    autorizaLogin,
} = require("../../middlewares/autorizationLogin");

const respostasRouter = new Router();
const respostasControllers = new RespostasControllers();

//VALIDAÇÕES
// const schemaPostQuestionario = yup.object({
//     body: yup.object({
//         titulo: yup.string().required("Título é obrigatório"),
//         descricao: yup.string().required("Descrição é obrigatório"),
//         perguntas: yup.array(
//             yup.object({
//                 descricao: yup
//                     .string()
//                     .required("Descrição da pergunta é obrigatório"),
//             })
//         ),
//     }),
// });

// const schemaDeleteQuestionario = yup.object({
//     params: yup.object({
//         id: yup.string().uuid("ID informado não é válido").required(),
//     }),
// });

// //ROTAS
respostasRouter.use(autorizaLogin); // Middleware de autorização para login

// respostasRouter.get("/", respostasControllers.index);

respostasRouter.post(
    "/:perguntaId",
    // validarSchema(schemaPostQuestionario),
    respostasControllers.create
);

// respostasRouter.delete(
//     "/:id",
//     validarSchema(schemaDeleteQuestionario),
//     respostasControllers.delete
// );

module.exports = respostasRouter;
