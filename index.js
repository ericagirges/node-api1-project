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
        id: 1,
        name: "Michael Scott",
        bio: "Regional Manager of the Dunder Mifflin Scranton Branch"
    }
]

// generate random new id
let nextId = shortid.generate()

// GET /users
server.get("/users", (req, res) => {
    res.status(200).json({ data: users });
});


const port = 5000;
server.listen(port, () => console.log("server running..."));