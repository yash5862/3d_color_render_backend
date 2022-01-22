"use strict";

const makeError = ( statusCode, code, message, type = undefined, field = undefined ) => {
    const error = new Error( message );
    error.statusCode = statusCode;
    error.code = code;
    error.type = type;
    error.field = field;
    return error;
}

exports.ER_UNAUTHORIZED_CLIENT = makeError( 401, "ER_UNAUTHORIZED_CLIENT", "Unauthorized client access to API.", "AUTHORIZATION" );
exports.ER_INVALID_USER_ACCESS = makeError( 403, "ER_INVALID_USER_ACCESS", "Current user is not allowed to access this API.", "AUTHORIZATION" );
exports.ER_USER_BLOCKED = makeError( 401, "ER_USER_BLOCKED", "User has been blocked by admin.", "AUTHORIZATION" );
