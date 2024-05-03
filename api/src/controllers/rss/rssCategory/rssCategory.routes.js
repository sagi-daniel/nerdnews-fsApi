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
  .get(
    authController.protect,
    authController.restrictTo("user", "admin"),
    findAll
  )
  .post(
    authController.protect,
    authController.restrictTo("user", "admin"),
    create
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("user", "admin"),
    findById
  )
  .patch(update)
  .delete(
    authController.protect,
    authController.restrictTo("user", "admin"),
    remove
  );

module.exports = router;
