const router = require("express").Router();
const {
  create,
  findAll,
  findById,
  update,
} = require("./rssCategory.controller");

router.route("/").get(findAll).post(create);
router.route("/:id").get(findById).patch(update);

module.exports = router;
