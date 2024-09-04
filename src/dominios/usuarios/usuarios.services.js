const usuarioModel = require("../../database/models/usuarios");
const { hashSync } = require("bcrypt");

class UsuariosServices {
    async list() {
        const listaUsuarios = usuarioModel.findAll({
            attributes: [
                ["id", "Id"],
                ["nome", "Nome do usuario"],
                ["sobrenome", "Sobrenome"],
                ["email", "Email"],
                ["createdAt", "Criado em"],
            ],
        });

        return listaUsuarios;
    }

    async createUser({ nome, sobrenome, email, senha }) {
        const usuarioExiste = await usuarioModel.findOne({
            where: {
                email,
            },
        });

        if (usuarioExiste) {
            return null;
        }

        const senhaCriptografada = hashSync(senha, 8);

        const usuario = await usuarioModel.create({
            nome,
            sobrenome,
            email,
            senha: senhaCriptografada,
        });

        return usuario;
    }

    async delete(id) {
        const usuarioExiste = await usuarioModel.findByPk(id);

        if (!usuarioExiste) {
            return false;
        }

        await usuarioExiste.destroy();
        return true;
    }
}

module.exports = UsuariosServices;
