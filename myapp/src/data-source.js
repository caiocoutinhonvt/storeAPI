"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var port = process.env.DB_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["".concat(__dirname, "/**/entity/*.ts")],
    migrations: ["".concat(__dirname, "/**/migrations/*.ts")]
});
exports.AppDataSource.initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})["catch"](function (err) {
    console.error("Error during Data Source initialization", err);
});
