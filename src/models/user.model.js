"use strict";

/**
 * Import module
 */
const mongoose = require("mongoose");
/**
 * Import constants
 */
const {
  USERS,
} = require("../constants/mongooseTable.constants");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// const USER_ROLES_ENUM = Object.values(USER_ROLES);
// const ACCESS_MODULES_ENUM = Object.values(ACCESS_MODULES);

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      default: null,
    },
    emailId: {
      type: String,
      required: true,
    },
    // age: {
    //   type: String,
    // },
    password: {
      hash: {
        type: String,
      },
      salt: {
        type: String,
      },
    },
    lastLoginTime: {
      type: Date,
      default: null,
    },
    isInvited: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(USERS, UserSchema);
