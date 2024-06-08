const router = require('express').Router();
const { create, findAll, findById, update, remove } = require('./category.controller');

const authController = require('../auth/auth.controller');

router.route('/').get(findAll).post(authController.protect, authController.restrictTo('user', 'admin'), create);
router
  .route('/:id')
  .get(findById)
  .patch(update)
  .delete(authController.protect, authController.restrictTo('user', 'admin'), remove);

module.exports = router;
