const router = require('express').Router();
const { create, findAll, findById, update, remove } = require('./source.controller');
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
 *     Source:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Az egyedi azonosító
 *         sourceName:
 *           type: string
 *           description: A forrás neve
 *         sourceType:
 *           type: string
 *           enum: ['RSS', 'RDF']
 *           description: A forrás típusa
 *         sourceLink:
 *           type: string
 *           description: A forrás URL-je
 *         category:
 *           type: string
 *           description: A kategória azonosítója, aminek a forráshoz tartozik
 *         comment:
 *           type: string
 *           description: Megjegyzés a forráshoz
 *       example:
 *         id: '5f8f8c44b54764421b7156c3'
 *         sourceName: 'Example News Source'
 *         sourceType: 'RSS'
 *         sourceLink: 'https://example.com/rss'
 *         category: '5f8f8c44b54764421b7156c2'
 *         comment: 'Ez egy példa forrás'
 *     SourceCreate:
 *       type: object
 *       required:
 *         - sourceName
 *         - sourceLink
 *         - category
 *       properties:
 *         sourceName:
 *           type: string
 *           description: A forrás neve
 *         sourceType:
 *           type: string
 *           enum: ['RSS', 'RDF']
 *           description: A forrás típusa
 *         sourceLink:
 *           type: string
 *           description: A forrás URL-je
 *         category:
 *           type: string
 *           description: A kategória azonosítója
 *         comment:
 *           type: string
 *           description: Megjegyzés a forráshoz
 *       example:
 *         sourceName: 'Example News Source'
 *         sourceType: 'RSS'
 *         sourceLink: 'https://example.com/rss'
 *         category: '5f8f8c44b54764421b7156c2'
 *         comment: 'Ez egy példa forrás'
 */

/**
 * @swagger
 * tags:
 *   name: Source
 *   description: Az összes forrással kapcsolatos művelet
 */

/**
 * @swagger
 * /source:
 *   get:
 *     summary: Minden forrás lekérdezése
 *     tags: [Source]
 *     responses:
 *       200:
 *         description: A források listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Source'
 *   post:
 *     summary: Új forrás létrehozása
 *     tags: [Source]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SourceCreate'
 *     responses:
 *       201:
 *         description: A forrás sikeresen létrehozva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Source'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 */
router.route('/').get(findAll).post(authController.protect, authController.restrictTo('admin'), create);

/**
 * @swagger
 * /source/{id}:
 *   get:
 *     summary: Egy forrás lekérdezése ID alapján
 *     tags: [Source]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A forrás ID-ja
 *     responses:
 *       200:
 *         description: A forrás adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Source'
 *       404:
 *         description: A forrás nem található
 *   patch:
 *     summary: Egy forrás frissítése
 *     tags: [Source]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A forrás ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SourceCreate'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A forrás sikeresen frissítve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Source'
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *       404:
 *         description: A forrás nem található
 *   delete:
 *     summary: Egy forrás törlése
 *     tags: [Source]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A forrás ID-ja
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: A forrás sikeresen törölve
 *       401:
 *         description: Jogosulatlan
 *       403:
 *         description: Tiltott
 *       404:
 *         description: A forrás nem található
 */
router
  .route('/:id')
  .get(findById)
  .patch(authController.protect, authController.restrictTo('admin'), update)
  .delete(authController.protect, authController.restrictTo('admin'), remove);

module.exports = router;
