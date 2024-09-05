const { Router } = require("express");
const yup = require("yup");

const RespostasControllers = require("./respostas.controllers");
const { validarSchema } = require("../../middlewares/validaRotas");

const respostasRouter = new Router();
const respostasControllers = new RespostasControllers();

//VALIDAÇÕES
const schemaPostResposta = yup.object({
    body: yup.object({
        conteudo: yup
            .string()
            .required("É necessário colocar um conteudo para resposta"),
    }),
});

const schemaDeleteResposta = yup.object({
    params: yup.object({
        id: yup.string().uuid("ID informado não é válido").required(),
    }),
});

//ROTAS

respostasRouter.get(
    "/",
    respostasControllers.index
    /*
    #swagger.tags = ['Respostas']
    #swagger.description = 'Endpoint para listar as respostas'
    */
);

respostasRouter.post(
    "/:perguntaId",
    validarSchema(schemaPostResposta),
    respostasControllers.create
    /*
    #swagger.tags = ['Respostas']
    #swagger.parameters['novaResposta'] = {
        in: 'body',
        description: 'Informações da resposta',
        required: true,
        schema: {
            $conteudo: "Respondendo questionário de teste"
        },
    }
    */
);

respostasRouter.delete(
    "/:id",
    validarSchema(schemaDeleteResposta),
    respostasControllers.delete

    /*
    #swagger.tags = ['Respostas']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da resposta',
        required: true,
        type:'string',
    }
    */
);

module.exports = respostasRouter;
