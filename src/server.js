const Fastify = require('fastify')
const server = Fastify({logger: false});
const mediaRouter = require('./routes/Media.js')
const userRouter = require('./routes/users.js')

server.register(require("@fastify/mysql"), {
    connectionString: "mysql://root:root@localhost:3308/docker_db"
})

server.register(mediaRouter);


//  ////////////////////////////////////////////////////////////////// SERVER USERS //////////////////////////////////////////

server.post('/users/:id/favoritos', (req, res)=> {
    const mediaid = Number(req.body.mediaid);
    server.mysql.query(`INSERT INTO docker_db.favorites (userid, mediaid) VALUES ('${Number(req.params.id)}','${Number(mediaid)}')`,
    (error, results)=> {
        if(error) {
            res.status(404).send({menssagem: "Item ja adicionado a lista"}, {error: error})
        }
        if(results.length === 0){
            res.send({Menssagem: "Usuario nao encontrado" })
        }
        res.send({menssagem:"ADICIONOU A LISTA DE FAVORITOS"})
    }
)
})

server.get("/users/:id/favoritos", (req, res)=> {
    server.mysql.query(`SELECT * FROM  favorites f inner join media m on f.mediaid = m.id where f.userid = ${Number(req.params.id)}`, (error, results)=> {
        if(error) {
            res.status(404).send({menssagem: 'Sem favoritos', error:error})
        }
        res.status(200).send(results)
        
    } )
})


server.listen({port: 3306}, function (error, address) {
    if(error) {
        console.log(error)
        process.exit(1)
    } 
    console.log("Servidor rodando", address);
})


