const router = require('express').Router();
const { create, findAll, findById, update, remove, top3fresh } = require('./news.controller');

router.route('/').get(findAll).post(create);
router.route('/top3fresh').get(top3fresh);
router.route('/:id').get(findById).patch(update).delete(remove);

module.exports = router;
