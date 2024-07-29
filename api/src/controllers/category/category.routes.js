const router = require('express').Router();
const { create, findAll, findById, update, remove } = require('./category.controller');
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
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         id:
 *           type: string
 *           description: Az egyedi azonosító
 *         categoryName:
 *           type: string
 *           description: A kategória neve
 *       example:
 *         id: '6660177cf80d5d7002d5d5a0'
 *         categoryName: NEW SAMPLE CATEGORY
 *     CategoryCreate:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         categoryName:
 *           type: string
 *           description: A kategória neve
 *       example:
 *         categoryName: NEW SAMPLE CATEGORY
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Az összes kategóriával kapcsolatos művelet
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Minden kategória lekérdezése
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A kategóriák listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.route('/').get(findAll);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Új kategória létrehozása
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     responses:
 *       201:
 *         description: A kategória sikeresen létrehozva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 */
router.route('/').post(authController.protect, authController.restrictTo('admin'), create);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Egy kategória lekérdezése ID alapján
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A kategória ID-ja
 *     responses:
 *       200:
 *         description: A kategória adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: A kategória nem található
 */
router.route('/:id').get(findById);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Egy kategória frissítése
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A kategória ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A kategória sikeresen frissítve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *       404:
 *         description: A kategória nem található
 *   delete:
 *     summary: Egy kategória törlése
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A kategória ID-ja
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: A kategória sikeresen törölve
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *       404:
 *         description: A kategória nem található
 */
router
  .route('/:id')
  .patch(authController.protect, authController.restrictTo('admin'), update)
  .delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
