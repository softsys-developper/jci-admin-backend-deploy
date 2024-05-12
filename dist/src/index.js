"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require('dotenv').config();
require("reflect-metadata");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const env_config_1 = require("./config/env.config");
const fs = require('fs');
// create and setup express app
const express = require('express');
const app = express();
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const index_database_1 = require("./database/index.database");
// Connection To Server
const httpServer = (0, http_1.createServer)(app);
app.use(function (req, res, next) {
    if (env_config_1.MODE_APP == 'dev') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
    }
    next();
});
const IoOptions = () => {
    if (env_config_1.MODE_APP == 'dev') {
        return {
            cors: { origin: '*', methods: ['GET', 'POST'] },
            path: '/api/socket.io',
        };
    }
    else {
        return {
            path: '/api/socket.io',
        };
    }
};
// Connection to sokect Io
exports.io = new socket_io_1.Server(httpServer, IoOptions());
exports.io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error('invalid username'));
    }
    socket.username = username;
    next();
});
// Middlewares And Redirect Route
app.use(express.json());
app.use('/i-images', express.static('public'));
app.use('/i-providers', express.static('public/providers'));
app.use('/', express.static('templates'));
// Config Engine
app.set('view engine', 'ejs');
// Routes
(0, index_routes_1.default)(app);
app.get('', async (req, res) => {
    res.send('Api Likidons...');
});
// Database Connected
index_database_1.dbx.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
// STARTING OF SERVER APP
httpServer.listen(env_config_1.env.PORT, () => {
    exports.io.on('connection', (socket) => { });
    console.log('Server started  => http://localhost:' + env_config_1.env.PORT);
});
