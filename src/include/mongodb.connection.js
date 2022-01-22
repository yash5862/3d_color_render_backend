"use strict";

/**
 * Imports module
 */
const mongoose = require("mongoose");
/**
 * Import config
 */
const { mongo } = require("../../config");
/**
 * Import logger
 */
const { appLogger } = require("../helpers/logger");

/**
 * Mongodb connection url
 */
// const mongodbConnectionUrl = `mongodb${mongo.port ? "" : "+srv"}://${
//     mongo.username
// }:${mongo.password}@${mongo.host}${
//     mongo.port ? ":".concat(mongo.port.toString()) : ""
// }/${mongo.dbName}`;

const mongodbConnectionUrl = mongo.url;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

/**
 * As per latest version of mongoose
 */
if (mongo.username && mongo.password) {
    options.authSource = "admin";
    options.user = mongo.username;
    options.pass = mongo.password;
}
mongoose
    .connect(mongodbConnectionUrl, options)
    .then(() => {
        appLogger.info(`Mongodb connection done`);
    })
    .catch((err) => {
        appLogger.error(`Mongodb error`, err);
        process.exit(1);
    });
