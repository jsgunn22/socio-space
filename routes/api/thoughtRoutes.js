const router = require("express").Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

module.exports = router;
