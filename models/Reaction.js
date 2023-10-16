const { Schema, Types, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

reactionSchema.path("createdAt").get(function () {
  dateControls = { year: "numeric", month: "short", day: "2-digit" };
  return createdAt.toLocalDateString(undefined, dateControls);
});

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
