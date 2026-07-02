function MediasRoutes(server){

    
    server.get("/media", (req, res)=>{
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
        const { title, description, type, releaseYear, genre
            } = req.body;

        server.mysql.query(`UPDATE media SET title = '${title}', description = '${description}', type = '${type}', releaseYear = '${releaseYear}', genre = '${genre}' WHERE media.id = ${Number(req.params.id)}`,
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


}

module.exports = MediasRoutes;