function connectToDatabase(server) {

    const db = server.register(require("@fastify/mysql"), {
    connectionString: "mysql://root:root@localhost:3308/docker_db"
})
}

const db = connectToDatabase();

module.exports = { db };