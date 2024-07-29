const router = require('express').Router();
const { create, findByQuery, findById, update, remove, top3fresh, slider } = require('./news.controller');
const authController = require('../auth/auth.controller');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - source
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Az egyedi azonosító
 *         release:
 *           type: string
 *           format: date
 *           description: A hír megjelenési dátuma
 *         creator:
 *           type: string
 *           description: A hír készítője
 *         source:
 *           type: string
 *           description: A hír forrása
 *         category:
 *           type: string
 *           description: A hír kategóriája
 *         title:
 *           type: string
 *           description: A hír címe
 *         link:
 *           type: string
 *           description: A hír linkje
 *         content:
 *           type: string
 *           description: A hír tartalma
 *         imageUrl:
 *           type: string
 *           description: A hír képének URL-je
 *       example:
 *         id: '5f8f8c44b54764421b7156c2'
 *         release: '2024-07-19'
 *         creator: 'John Doe'
 *         source: '5f8f8c44b54764421b7156c1'
 *         category: '5f8f8c44b54764421b7156c0'
 *         title: 'Új hír'
 *         link: 'https://example.com/news/uj-hir'
 *         content: 'Ez egy új hír tartalma'
 *         imageUrl: 'https://example.com/images/news.jpg'
 *     NewsCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - source
 *         - category
 *       properties:
 *         release:
 *           type: string
 *           format: date
 *           description: A hír megjelenési dátuma
 *         creator:
 *           type: string
 *           description: A hír készítője
 *         source:
 *           type: string
 *           description: A hír forrása
 *         category:
 *           type: string
 *           description: A hír kategóriája
 *         title:
 *           type: string
 *           description: A hír címe
 *         link:
 *           type: string
 *           description: A hír linkje
 *         content:
 *           type: string
 *           description: A hír tartalma
 *         imageUrl:
 *           type: string
 *           description: A hír képének URL-je
 *       example:
 *         release: '2024-07-19'
 *         creator: 'John Doe'
 *         source: '5f8f8c44b54764421b7156c1'
 *         category: '5f8f8c44b54764421b7156c0'
 *         title: 'Új hír'
 *         link: 'https://example.com/news/uj-hir'
 *         content: 'Ez egy új hír tartalma'
 *         imageUrl: 'https://example.com/images/news.jpg'
 */

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Az összes hírrel kapcsolatos művelet
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Hírek lekérdezése szűrés alapján
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A hírek listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.route('/').get(findByQuery);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Új hír létrehozása
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsCreate'
 *     responses:
 *       201:
 *         description: A hír sikeresen létrehozva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 */
router.route('/').post(authController.protect, authController.restrictTo('admin'), create);

/**
 * @swagger
 * /news/top3fresh:
 *   get:
 *     summary: A legfrissebb három hír lekérdezése
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A három legfrissebb hír
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.route('/top3fresh').get(top3fresh);

/**
 * @swagger
 * /news/slider:
 *   get:
 *     summary: Hírek lekérdezése a sliderhez
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A sliderhez szükséges hírek
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.route('/slider').get(slider);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Egy hír lekérdezése ID alapján
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A hír ID-ja
 *     responses:
 *       200:
 *         description: A hír adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: A hír nem található
 */
router.route('/:id').get(findById);

/**
 * @swagger
 * /news/{id}:
 *   patch:
 *     summary: Egy hír frissítése
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A hír ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsCreate'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A hír sikeresen frissítve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *       404:
 *         description: A hír nem található
 */
router.route('/:id').patch(authController.protect, authController.restrictTo('admin'), update);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Egy hír törlése
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A hír ID-ja
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: A hír sikeresen törölve
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *       404:
 *         description: A hír nem található
 */
router.route('/:id').delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
