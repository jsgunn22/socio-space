const { ObjectId } = require("mongodb");
const { Thought, User } = require("../models");

// get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const getAllThoughts = await Thought.find().populate("reactions");
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

    const getThisThought = await Thought.findById(thisId).populate("reactions");

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
    ).populate("thoughts");

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
    ).populate("thoughts");

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
    const thisId = new ObjectId(req.params.id);

    const deleteThisThought = await Thought.findByIdAndDelete(thisId);

    if (!deleteThisThought) {
      res.status(404).json(`Thought with id# ${thisId} does not exist`);
    }

    res.status(200).json(`Thought with id# ${thisId} has been deleted`);
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
};
