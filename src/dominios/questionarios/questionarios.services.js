const {
    Questionarios: questionariosModel,
} = require("../../database/models/questionarios");

class QuestionarioServices {
    async list(carregarPerguntas = false) {
        let listaQuestionarios;

        if (carregarPerguntas) {
            listaQuestionarios = questionariosModel
                .scope("carregarPerguntas")
                .findAll();
        } else {
            listaQuestionarios = questionariosModel.findAll();
        }

        return listaQuestionarios;
    }
    async create({ titulo, descricao, perguntas }) {
        let questionario;

        if (!(perguntas.length === 0)) {
            questionario = await questionariosModel.create(
                {
                    titulo,
                    descricao,
                    perguntas,
                },
                {
                    include: ["perguntas"],
                }
            );
        } else {
            questionario = await questionariosModel.create({
                titulo,
                descricao,
            });
        }

        return questionario;
    }

    async delete(id) {
        const questionarioExiste = await questionariosModel.findByPk(id);

        if (!questionarioExiste) {
            return false;
        }

        await questionarioExiste.destroy();
        return true;
    }
}

module.exports = QuestionarioServices;
