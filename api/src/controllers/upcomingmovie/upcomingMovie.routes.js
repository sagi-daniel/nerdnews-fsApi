const router = require("express").Router();
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require("./upcomingMovie.controller");

router.route("/").get(findAll);
router.route("/:id").get(findById);
router.route("/").post(create);
router.route("/:id").patch(update);
router.route("/:id").delete(remove);

module.exports = router;
