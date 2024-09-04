const { verify } = require("jsonwebtoken");
const jwtSecret = "mytimeatsandrock";

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function autorizaLogin(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) throw new Error("JWT Token não encontrado");

    const [, token] = authorization.split(" ");

    try {
        const decode = verify(token, jwtSecret);

        const { sub, permissao } = decode;

        request.usuario = {
            id: sub,
            permissao,
        };

        next();
    } catch (error) {
        throw new Error("Token inválido");
    }
}

/**
 *
 * @param {string} permissaoParametro
 * @returns {import('express').RequestHandler;}
 */
function garantirAutenticacaoRBAC(permissaoParametro) {
    return (request, response, next) => {
        const { authorization } = request.headers;

        if (!authorization) throw new Error("JWT Token não encontrado");

        const [, token] = authorization.split(" ");

        try {
            const decode = verify(token, jwtSecret);

            const { sub, permissao } = decode;

            if (permissao != permissaoParametro)
                throw new Error(
                    "Usuário não possui permissão para essa operação"
                );

            request.usuario = {
                id: sub,
                permissao,
            };

            next();
        } catch (error) {
            throw new Error("Token inválido");
        }
    };
}

module.exports = { autorizaLogin, garantirAutenticacaoRBAC };
