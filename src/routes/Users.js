function usersRoutes(server){

    server.post('/users/:id/favoritos', (req, res)=> {
        const mediaid = Number(req.body.mediaid);
            server.mysql.query(`INSERT INTO docker_db.favorites (userid, mediaid) VALUES ('${Number(req.params.id)}','${Number(mediaid)}')`,
                (error, results)=> {
                    if(error) {
                        res.status(404).send({menssagem: "Item ja adicionado a lista"}, {error: error})
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
}

module.exports = usersRoutes;