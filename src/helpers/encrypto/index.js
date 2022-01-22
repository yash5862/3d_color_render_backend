"use strict";

// REQUIRES ===========================================================================================
const { cryptoConfig } = require("../../../config");
const crypto = require("crypto");

// METHODS ============================================================================================
/**
 * Creates a random salt of 16 bytes hexadecimal values. (32 digits)
 * @returns {string}
 */
const generateRandomSalt = () => crypto.randomBytes(16).toString("hex");

/**
 * Generates 64 bytes hexadecimal password (120 digits) by using random salt, common salt and real password string.
 * @param randomSalt
 * @param password
 * @returns {string}
 */
const generatePasswordHash = (randomSalt, password) => {
    const commonSalt = cryptoConfig.userPasswordCommonSalt;
    const salt = commonSalt.concat(randomSalt);
    return crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
};
const decryptPassword = (randomSalt, password) =>{
    const pass = '6bac02286a752e0fa5d4d72cf1b26118cddc63bad228f279758633d0c883b819ae43500067c4d1f9cbc6de2dfb140b191e594248939e7baeda6c9e03d89573bc';
    const salt = '7f0d65f435f6bc56912219929a0e56b6';
    const decipher = crypto.createDecipheriv('sha512', pass, salt);
    const decode = decipher.read().toString('utf8');
    console.log("decode", decode)
    return decode;
};
/**
 * Changes a key/string to 16 bytes hexadecimal hash (32 digits).
 * @param key
 * @returns {string}
 */
const generateKeyHash = (key) =>
    crypto
        .pbkdf2Sync(key, generateRandomSalt(), 1000, 16, "sha512")
        .toString("hex");

// EXPORTS ============================================================================================
module.exports = {
    decryptPassword,
    generateRandomSalt,
    generatePasswordHash,
    generateKeyHash,
};
