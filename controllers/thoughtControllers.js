const { ObjectId } = require("mongodb");
const { Thought } = require("../models");

// get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const getAllThoughts = await Thought.find({});
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

    const getThisThought = await Thought.findById(thisId);

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
    const newThought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
