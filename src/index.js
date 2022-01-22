"use strict";

/**
 * Static Methods
 */
Date.prototype.addTime = function (h = 0, m = 0, s = 0, ms = 0) {
    this.setTime(
        this.getTime() + h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000 + ms
    );
    return this;
};

/**
 * Import module
 */
const express = require("express");
const http = require("http");
const cors = require("cors");
const routes = require('./index.route');
const APIError = require('./helpers/APIError');
const httpStatus = require("http-status");
const Path = require('path');
const app = express();
const server = http.createServer(app);
// const { createSocketIOServer } = require("./helpers/socket");
// createSocketIOServer(server);

// const { appLogger } = require("../src/helpers/logger");
const { env, port } = require("../config");
const imagesRoot = Path.join(__dirname, '..', 'uploads');

app.use('/uploads', express.static(imagesRoot));

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static(__dirname + "/public"));
// app.use(apiLoggerMiddleware());
// app.use(apiResponseMiddleware);
// app.use("/v1", routes);

// mount all routes on /api path
app.use('/api', routes);

/**
 * Mongodb Connection
 */
require("./include/mongodb.connection");
// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: 'development'
  })
);
/**
 * Server listen on port
 */
server.listen(port, () => {
    // appLogger.info(`Tron server listening on ${port} in ${env} mode`);
    console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
});
