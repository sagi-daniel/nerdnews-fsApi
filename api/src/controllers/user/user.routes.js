const router = require('express').Router();
const authController = require('../auth/auth.controller');

const {
  create,
  findAll,
  findById,
  update,
  remove,
  updateMe,
  deleteMe,
  getMe,
  getMyNews,
  getMyMovies,
  addNewsToMyNews,
  addMovieToMyMovies,
  removeNewsFromMyNews,
  removeMovieFromMyMovies,
} = require('./user.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.get('/me', authController.protect, getMe);
router.patch('/updateMe', authController.protect, updateMe);
router.delete('/deleteMe', authController.protect, deleteMe);

router.route('/news').get(authController.protect, getMyNews).post(authController.protect, addNewsToMyNews);
router.route('/news/:id').delete(authController.protect, removeNewsFromMyNews);

router.route('/movies').get(authController.protect, getMyMovies).post(authController.protect, addMovieToMyMovies);
router.route('/movies/:id').delete(authController.protect, removeMovieFromMyMovies);

router.route('/').get(authController.protect, findAll).post(authController.protect, create);
router
  .route('/:id')
  .get(authController.protect, findById)
  .patch(authController.protect, update)
  .delete(authController.protect, remove);
// .delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
