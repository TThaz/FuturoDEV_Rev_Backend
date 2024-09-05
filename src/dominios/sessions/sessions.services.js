const usuarioModel = require("../../database/models/usuarios");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwtSecret = "mytimeatsandrock";

class SessionServices {
    async create({ email, senha }) {
        const usuarioLogin = await usuarioModel.findOne({
            where: {
                email,
            },
        });

        if (!usuarioLogin) return null;

        const senhaCriptografada = compareSync(senha, usuarioLogin.senha);

        if (!senhaCriptografada) return null;

        const token = sign({ permissao: usuarioLogin.permissao }, jwtSecret, {
            subject: usuarioLogin.id,
            expiresIn: "1h",
        });

        return { usuarioLogin, token };
    }
}

module.exports = SessionServices;
