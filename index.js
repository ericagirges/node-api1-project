const express = require("express");
const shortId = require("shortid").generate

const server = express()
server.use(express.json())

const PORT = 4646

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})