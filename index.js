const express = require("express");
const shortId = require("shortid").generate

const server = express()
server.use(express.json())

const PORT = 4646

const users = [
    {
        id: shortId(),
        name: "Billie Joe Armstrong",
        bio: "I don't wanna be an American idiot."
    },
    {
        id: shortId(),
        name: "Marshall Mathers",
        bio: "Will the real Slim Shady please stand up?"
    }
]

// CRUD ENDPOINTS
// GET all users
server.get("/users", (req, res) => {
    res.status(200).json({ data: users })
})

// GET user by id
server.get("/users/:id", (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)

    if(!user) {
        res.status(400).json({ message: "Can't find requested user."})
    } else {
        res.status(200).json(user)
    }
})

// POST new user
server.post("/users", (req, res) => {
    const { name, bio } = req.body
    if(!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio." })
    } else {
        const newUser = { id: shortId(), name, bio }
        users.push(newUser)
        res.status(201).json(newUser)
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})