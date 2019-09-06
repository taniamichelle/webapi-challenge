const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

const projectsRouter = require('./projectsRouter');
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Server is listening!</h1>`);
});

function logger(req, res, next) { // req + res are objects and next is a cb function
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin'
        )}`
    );

    next();
}

module.exports = server;