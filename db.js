const { MongoClient } = require("mongodb")

let dbConnection

module.exports = {
    connectToDb: () => {
        MongoClient.connect("mongodb://localhost:27017/bookstore")
            .then((client) => {
                dbConnnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}