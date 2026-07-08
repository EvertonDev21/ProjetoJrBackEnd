const mediaController = require("../controllers/mediaControllers.js")
function MediasRoutes(server){

    server.get("/media", mediaController.index())

    server.post("/media", mediaController.store())

    server.get("/media/:id", mediaController.show())

    server.put("/media/:id", mediaController.update())

    server.delete("/media/:id", mediaController.delete())

}

module.exports = MediasRoutes;