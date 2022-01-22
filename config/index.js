/**
 * Load env variable
 */
require("dotenv").config();

/**
 * Config object
 */
const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiryTime: `${(
            parseInt(process.env.JWT_EXPIRES_IN) * 60
        ).toString()}s`,
    },
    mongo: {
        url: process.env.MONGODB_URI,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        port: process.env.DB_PORT,
        // username: process.env.DB_USERNAME,
        // password: process.env.DB_PASSWORD,
    },
    logLevels: {
        http: process.env.HTTP_LOG_LEVEL,
        app: process.env.APP_LOG_LEVEL,
    },
    emailConfig: {
        service: process.env.EMAIL_SERVICE || false,
        host: process.env.EMAIL_HOST || false,
        port: parseInt(process.env.EMAIL_port) || false,
        senderUser: process.env.EMAIL_SENDER_USER || false,
        senderID: process.env.EMAIL_SENDER_ID || false,
        senderPassword: process.env.EMAIL_SENDER_PASSWORD || false,
    },
    frontendConfig: {
        host: process.env.FRONTEND_HOST,
        port: parseInt(process.env.FRONTEND_PORT) || false,
        baseUrl: `${process.env.FRONTEND_HOST}${
            process.env.FRONTEND_PORT ? `:${process.env.FRONTEND_PORT}` : ""
        }/`,
        baseUrlNoSlash: `${process.env.FRONTEND_HOST}${
            process.env.FRONTEND_PORT ? `:${process.env.FRONTEND_PORT}` : ""
        }`,
        setPasswordSlug: process.env.FRONTEND_SET_PASSWORD_SLUG,
    },
    cryptoConfig: {
        userPasswordCommonSalt: process.env.USER_PASSWORD_COMMON_SALT
    }
};

/**
 * Exports config
 */
module.exports = config;
