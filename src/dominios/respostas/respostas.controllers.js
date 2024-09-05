const RespostasService = require("./respostas.services");

const respostaServices = new RespostasService();

class RespostasController {
    /**
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns
     */

    async index(request, response) {
        const listaRespostas = await respostaServices.list();
        return response.json(listaRespostas);
    }

    /**
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns
     */

    async create(request, response) {
        const { body } = request;
        const { perguntaId } = request.params;
        const { id } = request.usuario;

        const usuario = await respostaServices.create({
            ...body,
            perguntaId,
            usuarioId: id,
        });

        return response.status(201).json(usuario);
    }
    /**
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns
     */

    async delete(request, response) {
        const { id } = request.params;

        const isDeleted = await respostaServices.delete(id);

        if (!isDeleted) {
            return response.status(400).json({
                message: "Não foi possível apagar",
            });
        }

        return response.status(204).end();
    }
}

module.exports = RespostasController;
