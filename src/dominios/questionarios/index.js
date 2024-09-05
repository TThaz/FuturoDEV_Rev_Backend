const { Router } = require("express");
const yup = require("yup");

const QuestionariosControllers = require("./questionarios.controllers");
const { validarSchema } = require("../../middlewares/validaRotas");

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
questionarioRouter.get(
    "/",
    questionariosControllers.index

    /*
    #swagger.tags = ['Questionário']
    #swagger.description = 'Endpoint para listar os questionários'
    */
);

questionarioRouter.post(
    "/",
    validarSchema(schemaPostQuestionario),
    questionariosControllers.create

    /*
    #swagger.tags = ['Questionário']
    #swagger.parameters['novoQuestionario'] = {
        in: 'body',
        description: 'Informações do questionário',
        required: true,
        schema: {
            $titulo: "Questionário de exemplo",
            $descricao: "Este é um questionário de teste"
        },
    }
    */
);

questionarioRouter.delete(
    "/:id",
    validarSchema(schemaDeleteQuestionario),
    questionariosControllers.delete

    /*
    #swagger.tags = ['Questionário']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do questionário',
        required: true,
        type:'string',
    }
    */
);

module.exports = questionarioRouter;
