const router = require("express").Router();
const authController = require("../auth/auth.controller");
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require("./user.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(findAll)
  .post(create);
router
  .route("/:id")
  .get(findById)
  .patch(update)
  .delete(remove);

module.exports = router;
