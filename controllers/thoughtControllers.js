const { ObjectId } = require("mongodb");
const { Thought, User, Reaction } = require("../models");

// get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const getAllThoughts = await Thought.find()
      .populate("reactions")
      .select("-__v");
    res.status(200).json(getAllThoughts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get thought by id
const getThought = async (req, res) => {
  try {
    const thisId = new ObjectId(req.params.id);

    const getThisThought = await Thought.findById(thisId)
      .populate("reactions")
      .select("-__v");

    if (getThisThought) {
      res.status(200).json(getThisThought);
    } else {
      res.status(404).json(`No thought exists with id# ${thisId}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// create thought
const createThought = async (req, res) => {
  try {
    const userId = new ObjectId(req.body.userId);

    const newThought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });

    const pushToUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    )
      .populate(["thoughts"])
      .select("-__v");

    if (!pushToUser) {
      res.status(404).json(`User with id# ${req.body.userId} does not exist`);
    }

    res.status(200).json(pushToUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//udpate thought
const updateThought = async (req, res) => {
  try {
    const thisId = new ObjectId(req.params.id);
    const updateThisThought = await Thought.findByIdAndUpdate(
      thisId,
      { thoughtText: req.body.thoughtText },
      { new: true }
    );

    if (!updateThisThought) {
      res.status(404).json(`Thought with id# ${thisId} does not exist`);
    }

    res.status(200).json(updateThisThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete thought
const deleteThought = async (req, res) => {
  try {
    const deleteThisThought = await Thought.findByIdAndRemove(req.params.id);

    if (!deleteThisThought) {
      res
        .status(404)
        .json({ message: `Thought is id# ${req.params.id} does not exist` });
    }

    const deleteFromUser = await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );

    if (!deleteFromUser) {
      res.status(404).json(`Thought with id# ${req.params.id} does not exist`);
    }

    res.status(200).json(`Thought with id# ${req.params.id} has been deleted`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add Reaction to a Thought
const addReaction = async (req, res) => {
  try {
    const createReaction = await Reaction.create({
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    });

    const addReactionToThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: createReaction._id } },
      { new: true }
    ).populate("reactions");

    if (!addReactionToThought) {
      res
        .status(404)
        .json(`Thought with id# ${req.params.thoughtId} does not exist`);
    }

    res.status(200).json(addReactionToThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete Reaction from a Thought
const deleteReaction = async (req, res) => {
  try {
    const deleteThisReaction = await Reaction.findByIdAndRemove(
      req.params.reactionId
    );

    if (!deleteThisReaction) {
      res
        .status(404)
        .json(`Reaction with id# ${req.params.reactionId} does not exist`);
    }

    const deleteFromThought = await Thought.findOneAndUpdate(
      { reactions: req.params.reactionId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );

    res.status(200).json(deleteFromThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
