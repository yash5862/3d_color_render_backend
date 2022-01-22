const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../../config/param-validation');
const ObjectsCtrl = require('./3dobjects.controller');
const uploadObject = require('../../helpers/imageupload/multerHelper');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/objects - Get list of objects */
  .get(ObjectsCtrl.list)

  /** POST /api/objects - Create new object */
  .post(uploadObject.single('object'), ObjectsCtrl.create);

router.route('/:id')
  .get(ObjectsCtrl.get)

  /** PUT /api/objects/:objectId - Update object */
  .put(uploadObject.single('object'), ObjectsCtrl.update)

/** Load object when API with objectId route parameter is hit */
router.param('id', ObjectsCtrl.load);

module.exports = router;
