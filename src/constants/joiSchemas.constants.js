"use strict";

/**
 * Import module
 */
const Joi = require("joi");
const JoiMongooseObjectId = require("joi-objectid")(Joi);
const {JoiPassword} = require("joi-password");

/**
 * Import constants
 */

const ENUMS = require("../../src/constants/app.constants");

const DEFAULT_REFERENCES_ENUM = Object.keys(ENUMS.DEFAULT_REFERENCES);
const USER_ROLES_ENUM = Object.values(ENUMS.USER_ROLES);
const OPTION_TYPES_ENUM = Object.values(ENUMS.OPTION_TYPES);
const ACCESS_MODULES_ENUM = Object.values(ENUMS.ACCESS_MODULES);
const CONSIDER_TYPE_ENUM = Object.values(ENUMS.CONSIDER_TYPE);
const GENDER_TYPE_ENUM = Object.values(ENUMS.GENDER_TYPE);

const ERROR = require(".././../src/constants/errorMessages.constants");

/**
 * Joi validation codes
 */
const jvc = {
    commonDate: {
        required: Joi.date().required(),
        optional: Joi.date(),
    },
    commonTime: {
        optional: Joi.string()
            .min(4)
            .max(4)
            .pattern(/^[0-9]+$/),
    },
    commonAny: {
        required: Joi.any().required(),
        optional: Joi.any(),
    },
    commonString: {
        required: Joi.string().required(),
        optional: {
            allowEmpty: Joi.string().allow(""),
            notEmpty: Joi.string(),
        },
    },
    commonStringArray: {
        required: {
            allowEmpty: Joi.array().items(Joi.string()).required(),
            notEmpty: Joi.array().items(Joi.string()).min(1).required(),
        },
        optional: {
            allowEmpty: Joi.array().items(Joi.string()),
            notEmpty: Joi.array().items(Joi.string()).min(1),
        },
    },
    commonBoolean: {
        required: Joi.boolean().required(),
        optional: Joi.boolean(),
    },
    commonObjectId: {
        required: JoiMongooseObjectId().required(),
        optional: JoiMongooseObjectId(),
    },
    commonNumber: {
        optional: {
            absolute: Joi.number().min(0),
        },
    },
    email: {
        required: Joi.string().min(5).max(150).email().required(),
        optional: Joi.string().min(5).max(150).email(),
    },
    password: {
        required: JoiPassword.string()
            .min(8)
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required(),
        optional: JoiPassword.string()
            .min(8)
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces(),
    },
    contact: {
        required: Joi.string()
            .pattern(/^[0-9]+$/)
            .min(10)
            .required(),
        optional: Joi.string()
            .pattern(/^[0-9]+$/)
            .min(10),
    },
    objectIds: {
        required: {
            notEmpty: Joi.array()
                .items(JoiMongooseObjectId())
                .min(1)
                .required(),
        },
        optional: {
            allowEmpty: Joi.array().items(JoiMongooseObjectId()),
        },
    },
    approval: {
        required: Joi.string().valid("APPROVE", "REJECT", "PENDING").required(),
        optional: Joi.string().valid("APPROVE", "REJECT", "PENDING"),
    },
    experience: {
        optional: Joi.number().min(0).max(100),
        required: Joi.number().min(0).max(100).required(),
    },
    roles: {
        array: {
            optional: {
                allowEmpty: Joi.array().items(
                    Joi.string().valid(...USER_ROLES_ENUM)
                ),
            },
        },
    },
    optionTypes: {
        array: {
            optional: {
                allowEmpty: Joi.array().items(
                    Joi.string().valid(...OPTION_TYPES_ENUM)
                ),
            },
        },
    },
    gender: {
        required: {
            notEmpty: Joi.string()
                .valid(...GENDER_TYPE_ENUM)
                .required(),
        },
        optional: {
            notEmpty: Joi.string().valid(...GENDER_TYPE_ENUM),
        },
    },
    timeSlots: {
        array: {
            optional: Joi.array().items(
                Joi.object().keys({
                    startTime: Joi.string()
                        .min(4)
                        .max(4)
                        .pattern(/^[0-9]+$/),
                    endTime: Joi.string()
                        .min(4)
                        .max(4)
                        .pattern(/^[0-9]+$/),
                })
            ),
        },
    },
    considerType: {
        optional: Joi.string().valid(...CONSIDER_TYPE_ENUM),
    },
    defaultReference: {
        optional: {
            notEmpty: Joi.string().valid(...DEFAULT_REFERENCES_ENUM),
        },
    },
};

/**
 * Joi Error codes
 */
const jec = {
    object: {
        unknown: "object.unknown",
    },
    any: {
        required: "any.required",
        only: "any.only",
    },
    string: {
        base: "string.base",
        pattern: {
            name: "string.pattern.name",
        },
        empty: "string.empty",
        min: "string.min",
    },
    array: {
        base: "array.base",
        min: "array.min",
    },
    boolean: {
        base: "boolean.base",
    },
    number: {
        base: "number.base",
    },
    password: {
        minOfUppercase: "password.minOfUppercase",
        minOfLowercase: "password.minOfLowercase",
        minOfSpecialCharacters: "password.minOfSpecialCharacters",
        minOfNumeric: "password.minOfNumeric",
        noWhiteSpaces: "password.noWhiteSpaces",
    },
};

/**
 * Custom joi errors
 */
const customErrors = (errors) => {
    const error = {...errors[0]};
    const code = error.code;
    const path = error.path.join(".");

    if (code === jec.object.unknown) return ERROR.ER_UNKNOWN_OBJECT(path);
    if (code === jec.any.required) return ERROR.ER_REQUIRED_FIELD(path);
    if (code === jec.string.base) return ERROR.ER_TYPE_STRING(path);
    if (code === jec.array.base) return ERROR.ER_TYPE_ARRAY(path);
    if (code === jec.boolean.base) return ERROR.ER_TYPE_BOOLEAN(path);
    if (code === jec.number.base) return ERROR.ER_TYPE_NUMBER(path);
    if (code === jec.array.min) return ERROR.ER_EMPTY_ARRAY(path);
    if (code === jec.string.empty) return ERROR.ER_EMPTY_STRING(path);
    if (code === jec.string.pattern.name)
        return ERROR.ER_INVALID_FIELD(
            path,
            "should be a valid MongoDB Object Id."
        );
    if (code === jec.any.only)
        return ERROR.ER_INVALID_ENUM(
            path,
            `[ "${error.local.valids.join('", "')}" ]`
        );
    if (path === "password") {
        switch (code) {
            case jec.string.min:
            case jec.password.minOfUppercase:
            case jec.password.minOfLowercase:
            case jec.password.minOfSpecialCharacters:
            case jec.password.minOfNumeric:
            case jec.password.noWhiteSpaces:
                throw ERROR.ER_INVALID_PASSWORD;
        }
    }
    return ERROR.ER_INVALID_FIELD(path);
};
