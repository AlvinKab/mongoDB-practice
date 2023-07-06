const express = require("express")
const { ObjectId } = require("mongodb")
const { connectionToDb, getDb } = require("./db")

const app = express()
application.use(express.json())

let db

connectionToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("app listening on port 3000")
        })
        db = getBd()
    }
})

app.get("/books", (req, res) => {
    const page = req.query.p || 0
    const booksPerPage = 5
    let books = []
    db.collection("books")
        .find()
        .sort({author: 1})
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch the documents"})
        })
    res.json({mssg: "Welcome to the API"})
})

app.get("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            req.status(500).json({error: "Could not fetch the document"})
        })
    } else {
        res.status(500).json({error: "Not a valid document ID"})
    }
})

app.post("/books", (req, res) => {
    const book = req.body

    db.collection("books")
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: "Could not create a new document"})
        })
})