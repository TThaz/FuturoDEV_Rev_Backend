const swaggerAutoGen = require("swagger-autogen");

const doc = {
    info: {
        title: "Questionários API",
        description: "API para gerenciamento de questionários e respostas",
        version: "1.0.0",
    },
    host: "localhost:3333",
    security: [{ apiKeyAuth: [] }],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Bearer <token>",
        },
    },
};

const outputFile = "./src/dominios/doc.swagger.json";
const routesFile = ["./src/server.js"];

swaggerAutoGen(outputFile, routesFile, doc);
