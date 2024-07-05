const router = require('express').Router();
const { findByQuery } = require('./search.controller');

router.route('/').get(findByQuery);

module.exports = router;
