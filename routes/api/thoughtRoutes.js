const router = require("express").Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
