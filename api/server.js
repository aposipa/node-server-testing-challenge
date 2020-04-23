const express = require('express');
const Users = require('../users/usersModel.js');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
    Users.getAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

server.post('/users', (req, res) => {
    const user = req.body;

    Users.insert(user)
    .then(createUser => {
        res.status(201).json({ message: "New User Created!", createUser });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failled to POST User", err });
    });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ removed: deleted });
        } else {
            res.status(404).json({ message: 'Could Not Delete This User'})
        }
    })
})

module.exports = server;