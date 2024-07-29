const router = require('express').Router();
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
const authController = require('../auth/auth.controller');

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       description: User signup details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: ExampleUser
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               passwordConfirm:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User signed up successfully
 *       '400':
 *         description: Bad request
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /user/forgotPassword:
 *   post:
 *     summary: Request password reset
 *     tags: [User]
 *     requestBody:
 *       description: User email to reset password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       '200':
 *         description: Password reset email sent
 *       '400':
 *         description: Bad request
 */
router.post('/forgotPassword', authController.forgotPassword);

/**
 * @swagger
 * /user/resetPassword/{token}:
 *   patch:
 *     summary: Reset user password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New password details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: password123
 *               passwordConfirm:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '400':
 *         description: Bad request
 */
router.patch('/resetPassword/:token', authController.resetPassword);

/**
 * @swagger
 * /user/updateMyPassword:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     requestBody:
 *       description: Current and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: currentPassword123
 *               newPassword:
 *                 type: string
 *                 example: newPassword123
 *               newPasswordConfirm:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '401':
 *         description: Unauthorized
 */
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successfully retrieved user profile
 *       '401':
 *         description: Unauthorized
 */
router.get('/me', authController.protect, getMe);

/**
 * @swagger
 * /user/updateMe:
 *   patch:
 *     summary: Update current user profile
 *     tags: [User]
 *     requestBody:
 *       description: User profile details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: NewUserName
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *     responses:
 *       '200':
 *         description: Successfully updated user profile
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.patch('/updateMe', authController.protect, updateMe);

/**
 * @swagger
 * /user/deleteMe:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     responses:
 *       '204':
 *         description: User account deleted successfully
 *       '401':
 *         description: Unauthorized
 */
router.delete('/deleteMe', authController.protect, deleteMe);

/**
 * @swagger
 * /user/news:
 *   get:
 *     summary: Get user's news
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's news
 *       '401':
 *         description: Unauthorized
 *   post:
 *     summary: Add news to user's news list
 *     tags: [User]
 *     requestBody:
 *       description: News details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newsId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       '201':
 *         description: Successfully added news
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.route('/news').get(authController.protect, getMyNews).post(authController.protect, addNewsToMyNews);

/**
 * @swagger
 * /user/news/{id}:
 *   delete:
 *     summary: Remove news from user's news list
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       '204':
 *         description: Successfully removed news
 *       '401':
 *         description: Unauthorized
 */
router.route('/news/:id').delete(authController.protect, removeNewsFromMyNews);

/**
 * @swagger
 * /user/movies:
 *   get:
 *     summary: Get user's movies
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's movies
 *       '401':
 *         description: Unauthorized
 *   post:
 *     summary: Add movie to user's movies list
 *     tags: [User]
 *     requestBody:
 *       description: Movie details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       '201':
 *         description: Successfully added movie
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.route('/movies').get(authController.protect, getMyMovies).post(authController.protect, addMovieToMyMovies);

/**
 * @swagger
 * /user/movies/{id}:
 *   delete:
 *     summary: Remove movie from user's movies list
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109cb
 *     responses:
 *       '204':
 *         description: Successfully removed movie
 *       '401':
 *         description: Unauthorized
 */
router.route('/movies/:id').delete(authController.protect, removeMovieFromMyMovies);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all users
 *       '401':
 *         description: Unauthorized
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     requestBody:
 *       description: User details to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: NewUser
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               passwordConfirm:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       '201':
 *         description: Successfully created user
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin'), findAll)
  .post(authController.protect, authController.restrictTo('admin'), create);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109cc
 *     responses:
 *       '200':
 *         description: Successfully retrieved user
 *       '401':
 *         description: Unauthorized
 *   patch:
 *     summary: Update user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109cc
 *     requestBody:
 *       description: User details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: UpdatedUserName
 *               email:
 *                 type: string
 *                 example: updateduser@example.com
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       '200':
 *         description: Successfully updated user
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109cc
 *     responses:
 *       '204':
 *         description: Successfully deleted user
 *       '401':
 *         description: Unauthorized
 */
router
  .route('/:id')
  .get(authController.protect, authController.restrictTo('admin'), findById)
  .patch(authController.protect, authController.restrictTo('admin'), update)
  .delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
