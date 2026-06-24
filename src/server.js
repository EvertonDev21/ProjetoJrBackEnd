const Fastify = require('fastify')

const server = Fastify({logger: false});

server.register(require("@fastify/mysql"), {
    connectionString: "mysql://root:root@localhost:3306/docker_db"
})

server.get("/media", function(req, res) {
    server.mysql.query("SELECT * FROM docker_db.media",
        function onResult(error, results) {
            res.send(error || results)
        }
    )
})

server.post("/media", (req, res)=> {
    server.mysql.query(
        `INSERT INTO docker_db.media (title, description, type, releaseYear, genre) VALUES ('${req.body.title}','${req.body.description}', '${req.body.type}','${req.body.releaseYear}', '${req.body.genre}')`,
        (error, results)=> {
            if(error) {
                console.log(error)
            }
            res.status(201).send(results)
        }
    )
})

server.get("/media/:id", (req, res)=> {
    server.mysql.query(`SELECT * FROM docker_db.media WHERE ID = ${Number(req.params.id)}`,
    (error, results)=> {
        if(results.length === 0) {
            res.status(404).send({menssagem: "A lista esta vazia"})
        }
        res.send(error || results)
    })
})

server.put("/media/:id", (req, res)=> {
    server.mysql.query(`UPDATE media SET title = '${req.body.title}', description = '${req.body.description}', type = '${req.body.type}', releaseYear = '${req.body.releaseYear}', genre = '${req.body.genre}' WHERE media.id = ${Number(req.params.id)}`,
        (error, results)=>{
            res.send(error || results)
        }
    )
})

server.delete("/media/:id", (req, res)=> {
    server.mysql.query(`DELETE FROM docker_db.media WHERE id = ${Number(req.params.id)}`,
    (error, results)=> {
        res.send(error || results)
    })
})

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


server.listen({port: 3000}, function (error, address) {
    if(error) {
        console.log(error)
        process.exit(1)
    } 
    console.log("Servidor rodando", address);
})


