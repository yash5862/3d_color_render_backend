const ObjectModel = require("./3dobjects.model");
const APIResponse = require("../../helpers/APIResponse");
const Utils = require("../../helpers/utils");
const httpStatus = require("http-status");

/**
 * Load Object and append to req.
 */
async function load(req, res, next, id) {
  try {
    req.objectData = await ObjectModel.findOne({ _id: id }); // eslint-disable-line no-param-reassign
    return next();
  } catch (e) {
    return next(e);
  }
}

/**
 * Get object
 * @returns {ObjectModel}
 */
function get(req, res) {
  return res
    .status(httpStatus.OK)
    .send(new APIResponse(req.objectData, Utils.messages.SUCCESS_MSG));
}

/**
 * Create new ObjectModel
 * @returns {ObjectModel}
 */
async function create(req, res, next) {
  try {
    const file = req.file;
    const obj = new ObjectModel({
      name: req.body.name,
      path3D: file.path.replace(/\\/g, "/"),
      image: req.body.image,
      isActive: true,
    });
    const newObj = await obj.save();
    res
      .status(httpStatus.OK)
      .send(new APIResponse(newObj, Utils.messages.SUCCESS_MSG));
  } catch (e) {
    next(e);
  }
}

/**
 * Update existing ObjectModel
 * @returns {ObjectModel}
 */
async function update(req, res, next) {
  const objectData = req.objectData;
  const file = req.file;
  if (file) {
    objectData.name = req.body.name;
    objectData.path3D = file.path.replace(/\\/g, "/");
    objectData.image = req.body.image;
  }
  try {
    const savedObjectData = await objectData.save();
    res
      .status(httpStatus.OK)
      .send(new APIResponse(savedObjectData, Utils.messages.SUCCESS_UPDATE));
  } catch (e) {
    next(e);
  }
}

/**
 * Get Objects list.
 * @property {number} req.query.skip - Number of objects to be skipped.
 * @property {number} req.query.limit - Limit number of objects to be returned.
 * @returns {ObjectModel[]}
 */
async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const objects = await ObjectModel.list({ limit, skip });
    const count = await ObjectModel.countDocuments();
    const data = { count, objects };
    res
      .status(httpStatus.OK)
      .send(new APIResponse(data, Utils.messages.SUCCESS_MSG));
  } catch (e) {
    next(e);
  }
}

module.exports = { load, get, create, update, list };
