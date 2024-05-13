"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const env_config_1 = require("./config/env.config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// create and setup express app
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = require("http");
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
// Middlewares And Redirect Route
app.use(express_1.default.json());
app.use('/i-images', express_1.default.static('public'));
app.use('/i-providers', express_1.default.static('public/providers'));
app.use('/', express_1.default.static('templates'));
// Config Engine
app.set('view engine', 'ejs');
// Routes
(0, index_routes_1.default)(app);
app.get('', async (req, res) => {
    res.send('Api Jci...');
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
    console.log('Server started  => http://localhost:' + env_config_1.env.PORT);
});
