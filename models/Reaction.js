const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

reactionSchema.path("createdAt").get(() => {
  dateControls = { year: "numeric", month: "short", day: "2-digit" };
  return createdAt.toLocalDateString(undefined, dateControls);
});

const Reaction = mongoose.model("reaction", reactionSchema);

module.exports = Reaction;
