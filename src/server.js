const Fastify = require('fastify')
const server = Fastify({logger: false});
const mediaRouter = require('./routes/Media.js')
const userRouter = require("./routes/Users.js")

server.register(require("@fastify/mysql"), {
    connectionString: "mysql://root:root@localhost:3308/docker_db"
})

server.register(mediaRouter, userRouter);



server.listen({port: 3306}, function (error, address) {
    if(error) {
        console.log(error)
        process.exit(1)
    } 
    console.log("Servidor rodando", address);
})


