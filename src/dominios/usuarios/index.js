const { Router } = require("express");
const yup = require("yup");

const { validarSchema } = require("../../middlewares/validaRotas");
const UsuariosControllers = require("./usuarios.controllers");

const usuarioRouter = new Router();
const usuariosControllers = new UsuariosControllers();

const schemaPostUsuarios = yup.object({
    body: yup.object({
        nome: yup.string().required("ome é obrigatório"),
        sobrenome: yup.string(),
        email: yup
            .string()
            .email("Email no formato inválido")
            .required("Email é obrigatório"),
        senha: yup
            .string()
            .min(6, "Mínimo de 6 caracteres")
            .max(12, "Máximo de 12 caracteres")
            .required("Senha é obrigatório"),
        permissao: yup
            .string()
            .oneOf(
                ["criador", "usuario"],
                "Essa permissão não existe no banco de dados"
            )
            .required("Defina a permissão desse usuário!"),
    }),
});

usuarioRouter.get(
    "/",
    usuariosControllers.index
    /*
        #swagger.tags = ['Usuários']
        #swagger.description = 'Endpoint para listar os usuários'
    */
);

usuarioRouter.post(
    "/",
    validarSchema(schemaPostUsuarios),
    usuariosControllers.create
    /*
        #swagger.tags = ['Usuários']
        #swagger.parameters['novoUsuário'] = {
            in: 'body',
            description: 'Informações do Usuário',
            required: true,
            schema: {
                $nome: "User",
                $sobrenome: "Teste",
                $email: "userteste@email.com",
                $senha: "12345678",
                $permissao: "usuario",
            },
        }
    */
);

usuarioRouter.delete(
    "/:id",
    usuariosControllers.delete
    /*
        #swagger.tags = ['Usuários']
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do Usuário',
            required: true,
            type:'string',
        }
    */
);

module.exports = usuarioRouter;
