const express = require("express");
const shortId = require("shortid").generate

const server = express()
server.use(express.json())

const PORT = 4646

let users = [
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
    try {
        res.status(200).json({ data: users })
    } catch (error) {
        res.status(500).json({ error: "Could not access database." })
    }

})

// GET user by id
server.get("/users/:id", (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)

    try {
        if(!user) {
            res.status(404).json({ message: "Can't find requested user."})
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({ error: "Could not access database." })
    }

})

// POST new user
server.post("/users", (req, res) => {
    const { name, bio } = req.body

    try {
        if(!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio." })
        } else {
            const newUser = { id: shortId(), name, bio }
            users.push(newUser)
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({ error: "Could not access database." })      
    }

})

// PUT edit user
server.put("/user/:id", (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    const indexOfUser = users.findIndex(user => user.id === id)

    try {
        if(indexOfUser !== -1) {
            users[indexOfUser] = { id, name, bio }
            res.status(200).json({ id, name, bio })
        } else {
            res.status(404).json({ message: "User can not be found." })
        }
    } catch (error) {
        res.status(500).json({ error: "Could not access database." })        
    }

})

// DELETE user
server.delete("/user/:id", (req, res) => {
    const { id } = req.params

    try {
        if (!users.find(user => user.id === id)) {
            res.status(404).json({ message: "Not found." })
        } else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({ message: `User with id ${id} has been deleted.`})
        }
    } catch (error) {
        res.status(500).json({ message: " Could not access database."})
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})