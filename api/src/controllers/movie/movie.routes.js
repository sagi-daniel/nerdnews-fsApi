const router = require('express').Router();
const authController = require('../auth/auth.controller');
const { create, slider, findById, findByQuery, update, remove } = require('./movie.controller');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Az egyedi azonosító
 *         tmdb_id:
 *           type: integer
 *           description: A TMDB azonosító
 *         release:
 *           type: string
 *           format: date
 *           description: A film megjelenési dátuma
 *         title:
 *           type: string
 *           description: A film címe
 *         overview:
 *           type: string
 *           description: A film tartalmának összefoglalása
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: A film műfajai
 *         poster:
 *           type: string
 *           description: A film posztere
 *         voteAverage:
 *           type: number
 *           format: float
 *           description: A film átlagos szavazati értéke
 *         voteCount:
 *           type: integer
 *           description: A film szavazati száma
 *       example:
 *         id: '5f8f8c44b54764421b7156c2'
 *         tmdb_id: 123456
 *         release: '2024-07-19'
 *         title: 'Film címe'
 *         overview: 'Ez egy film összefoglalója'
 *         genre: ['Action', 'Drama']
 *         poster: 'https://example.com/images/movie.jpg'
 *         voteAverage: 7.8
 *         voteCount: 1500
 *     MovieCreate:
 *       type: object
 *       required:
 *         - tmdb_id
 *         - release
 *         - title
 *         - genre
 *         - poster
 *       properties:
 *         tmdb_id:
 *           type: integer
 *           description: A TMDB azonosító
 *         release:
 *           type: string
 *           format: date
 *           description: A film megjelenési dátuma
 *         title:
 *           type: string
 *           description: A film címe
 *         overview:
 *           type: string
 *           description: A film tartalmának összefoglalása
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: A film műfajai
 *         poster:
 *           type: string
 *           description: A film posztere
 *         voteAverage:
 *           type: number
 *           format: float
 *           description: A film átlagos szavazati értéke
 *         voteCount:
 *           type: integer
 *           description: A film szavazati száma
 *       example:
 *         tmdb_id: 123456
 *         release: '2024-07-19'
 *         title: 'Film címe'
 *         overview: 'Ez egy film összefoglalója'
 *         genre: ['Action', 'Drama']
 *         poster: 'https://example.com/images/movie.jpg'
 *         voteAverage: 7.8
 *         voteCount: 1500
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Az összes filmmel kapcsolatos művelet
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Filmek lekérdezése szűrés alapján
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A filmek listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.route('/').get(findByQuery).post(authController.protect, authController.restrictTo('admin'), create);

/**
 * @swagger
 * /movies/slider:
 *   get:
 *     summary: Filmek lekérdezése a sliderhez
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A sliderhez szükséges filmek
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.route('/slider').get(slider);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Egy film lekérdezése ID alapján
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A film ID-ja
 *     responses:
 *       200:
 *         description: A film adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: A film nem található
 *   patch:
 *     summary: Egy film frissítése ID alapján
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieCreate'
 *     responses:
 *       200:
 *         description: A film sikeresen frissítve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *   delete:
 *     summary: Egy film törlése ID alapján
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: A film sikeresen törölve
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 */
router
  .route('/:id')
  .get(findById)
  .patch(authController.protect, authController.restrictTo('admin'), update)
  .delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
