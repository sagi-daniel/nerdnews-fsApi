const router = require('express').Router();
const { create, findByQuery, findById, update, remove, top3fresh, slider } = require('./news.controller');

router.route('/').get(findByQuery).post(create);
router.route('/top3fresh').get(top3fresh);
router.route('/slider').get(slider);
router.route('/:id').get(findById).patch(update).delete(remove);

module.exports = router;
