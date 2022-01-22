"use strict";

/**
 * Import module
 */
const log4js = require("log4js");
/**
 * Import config
 */
const { logLevels } = require("../../../config");

const appLogger = log4js.getLogger("[tron]");
appLogger.level = logLevels.app;

const HTTPLogger = log4js.getLogger("[tron-HTTP]");
HTTPLogger.level = logLevels.http;

const getCustomLogger = (label = "[tron-Misc]", logLevel = "debug") => {
    const customLogger = log4js.getLogger(label);
    customLogger.level = logLevel;
    return customLogger;
};

module.exports = {
    appLogger,
    HTTPLogger,
    getCustomLogger,
};
