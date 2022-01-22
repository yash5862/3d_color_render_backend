/* eslint-disable max-len */
const Promise = require("bluebird");
// const config = require('../../../config/config');
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../../helpers/APIError");
/**
 * Import constants
 */
const { OBJECTS } = require("../../constants/mongooseTable.constants");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * Object Schema
 */
const ObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    path3D: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
ObjectSchema.method({});

/**
 * Statics
 */
ObjectSchema.statics = {
  /**
   * Get Object
   * @param {ObjectId} id - The objectId of 3dobject.
   * @returns {Promise<Object, APIError>}
   */
  get(id) {
    try {
      return this.findById(id);
    } catch (e) {
      const err = new APIError("No such object exists!", httpStatus.NOT_FOUND);
      return Promise.reject(err);
    }
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

module.exports = mongoose.model(OBJECTS, ObjectSchema);