const express = require("express");

const server = express();

server.use(express.json());

const shortid = require('shortid');

server.get("/", (req, res) => {
    res.status(200).json({ hello: "Node 34" });
})

// user data
let users = [
    {
        id: shortid.generate(),
        name: "Michael Scott",
        bio: "Regional Manager of the Dunder Mifflin Scranton Branch"
    }
]

// generate random new id
let nextId = shortid.generate()

// GET /users
server.get("/users", (req, res) => {
    if(users) {
        res.status(200).json({ data: users });
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }

});

// GET /users by id
server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const found = users.find(user => user.id === id)

    if (found) {
        res.status(200).json({ data: found })
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})


const port = 5000;
server.listen(port, () => console.log("server running..."));