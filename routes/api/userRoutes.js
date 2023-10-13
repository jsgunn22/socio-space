const router = require("express").Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userControllers");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
