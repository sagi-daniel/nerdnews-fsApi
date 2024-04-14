const router = require("express").Router();
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require("./upcomingMovie.controller");

router.route("/").get(findAll).post(create);
router.route("/:id").get(findById).patch(update);

module.exports = router;
