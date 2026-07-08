const usersController = require("../controllers/usersControllers.js")
function usersRoutes(server){

    server.post('/users/:id/favoritos', usersController.store())

    server.get("/users/:id/favoritos", usersController.listFavorites())
}

module.exports = usersRoutes;