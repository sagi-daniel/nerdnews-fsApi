const router = require('express').Router();
const authController = require('../auth/auth.controller');
const { create, findAll, findById, findByQuery, update, remove } = require('./movie.controller');

router.route('/').get(findByQuery).post(authController.protect, authController.restrictTo('admin'), create);
router
  .route('/:id')
  .get(findById)
  .patch(authController.protect, authController.restrictTo('admin'), update)
  .delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
