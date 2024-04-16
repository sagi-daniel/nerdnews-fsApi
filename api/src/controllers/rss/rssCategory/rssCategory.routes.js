const router = require("express").Router();
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require("./rssCategory.controller");

const authController = require("../../auth/auth.controller");

router
  .route("/")
  .get(findAll)
  .post(create);
router
  .route("/:id")
  .get(findById)
  .patch(update)
  .delete(authController.protect, authController.restrictTo("USER"), remove);

module.exports = router;
