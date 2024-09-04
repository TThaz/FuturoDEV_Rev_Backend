const QuestionariosService = require("./questionarios.services");

const questionarioServices = new QuestionariosService();

class QuestionariosController {
    /**
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns
     */
    async index(request, response) {
        const { carregarPerguntas } = request.query;
        const listaUsuarios =
            await questionarioServices.list(carregarPerguntas);

        return response.json(listaUsuarios);
    }
    /**
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns
     */

    async create(request, response) {
        const { body } = request;

        const usuario = await questionarioServices.create(body);

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

        const isDeleted = await questionarioServices.delete(id);

        if (!isDeleted) {
            return response.status(400).json({
                message: "Não foi possível apagar",
            });
        }

        return response.status(204).end();
    }
}

module.exports = QuestionariosController;
