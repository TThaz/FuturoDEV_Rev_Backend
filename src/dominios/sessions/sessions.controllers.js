const SessionsServices = require("./sessions.services");

const sessionsService = new SessionsServices();

class SessionsController {
    /**
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     * @returns
     */

    async create(request, response) {
        const { body } = request;

        const session = await sessionsService.create(body);

        if (!session)
            return response.status(400).json("Email ou Senha inválidos");

        return response.json(session);
    }
}

module.exports = SessionsController;
