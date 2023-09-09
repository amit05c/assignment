const express = require('express');
const server = express();
const cors = require('cors');
const { router } = require('./routes/task.router');

server.use(express.json());
server.use(cors());

server.use(router)




server.listen(8080, () =>
    console.log("Running in the port 8080")
);