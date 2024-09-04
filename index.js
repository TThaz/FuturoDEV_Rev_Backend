//CommonJS = require()
//ESmodule = import {} from ''
const http = require('node:http')

let usuarios = [
    {
        id: 1,
        nome:"Joaquim",
        senha: 123456
    },
    {
        id: 2,
        nome:"Pedro",
        senha: 123456
    }
]

const server = http.createServer((request, response) => {

    const { method, url } = request

    if(method == 'GET' && url === '/usuarios') {
        response.setHeader('Content-type', 'application/json')
        return response.end(JSON.stringify(usuarios))
    }

    if(method == 'POST' && url === '/usuarios') {
        response.statusCode = 401

        return response.end("Usuario sem permissão")
    }

    return response.end("Hello world")
})

//porta, recebe port, hostname e um listeners

const port = 3333
const hostname = "localhost"
server.listen(3333, hostname, () => {
    
    console.log(`Servidor rodando na porta ${port}: http://${hostname}:${port}`)
})

//Acesso local => http://${localhost}:${port}