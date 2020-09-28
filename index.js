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
server.get("/api/users", (req, res) => {
    if(users) {
        res.status(200).json({ data: users });
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }

});

// GET /users by id
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    try {
        // retrieve the user from the "database" - try / catch will catch this if there's a failure
        const found = users.find(user => user.id === id)

        if (found) {
            res.status(200).json({ data: found })
            return;
        }

        res.status(404).json({ message: "The user with the specified ID does not exist." })
   
    } catch (e) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
});

// POST /users
server.post("/api/users", (req, res) => {
    const data = req.body

    if (!data.name || !data.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }

    try {
        // add the user to the "database" - try / catch will catch if there is a failure
        users.push({id: nextId, ...data})


    } catch (e) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"  })
    }
});


const port = 5000;
server.listen(port, () => console.log("server running..."));