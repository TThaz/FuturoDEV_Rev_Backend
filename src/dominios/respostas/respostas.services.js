const {
    Respostas: respostasModel,
} = require("../../database/models/respostas");

class RespostasServices {
    async list(carregarPerguntas = false) {
        let listaRespostas;

        if (carregarPerguntas) {
            listaRespostas = respostasModel
                .scope("carregarPerguntas")
                .findAll();
        } else {
            listaRespostas = respostasModel.findAll();
        }

        return listaRespostas;
    }
    async create({ conteudo, perguntaId, usuarioId }) {
        const resposta = await respostasModel.create({
            conteudo,
            perguntaId,
            usuarioId,
        });

        return resposta;
    }

    async delete(id) {
        const questionarioExiste = await respostasModel.findByPk(id);

        if (!questionarioExiste) {
            return false;
        }

        await questionarioExiste.destroy();
        return true;
    }
}

module.exports = RespostasServices;
