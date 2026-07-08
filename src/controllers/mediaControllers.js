function MediaController(server) {

    index = (req, res) => {
        server.mysql.query("SELECT * FROM docker_db.media",
        (error, results) => {
            res.send(error || results)
        }
    )
    }
    show = (req, res)=> {
        server.mysql.query(`SELECT * FROM docker_db.media WHERE ID = ${Number(req.params.id)}`,
        (error, results)=> {
            if(results.length === 0) {
                res.status(404).send({menssagem: "A lista esta vazia"})
            }
            res.send(error || results)
        })
    
    }

    store = (req, res)=> {
        server.mysql.query(
            `INSERT INTO docker_db.media (title, description, type, releaseYear, genre) VALUES ('${req.body.title}','${req.body.description}', '${req.body.type}','${req.body.releaseYear}', '${req.body.genre}')`,
            (error, results)=> {
                if(error) {
                    console.log(error)
                }
                res.status(201).send(results)
            }
        )
    }
    update = (req, res)=> {
        const { title, description, type, releaseYear, genre
            } = req.body;

        server.mysql.query(`UPDATE media SET title = '${title}', description = '${description}', type = '${type}', releaseYear = '${releaseYear}', genre = '${genre}' WHERE media.id = ${Number(req.params.id)}`,
            (error, results)=>{
                res.send(error || results)
            }
        )
    }

    this.delete = (req, res)=> {
        server.mysql.query(`DELETE FROM docker_db.media WHERE id = ${Number(req.params.id)}`,
        (error, results)=> {
            res.send(error || results)
        })
    }
}

module.exports = new MediaController();