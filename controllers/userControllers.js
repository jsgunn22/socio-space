const { ObjectId } = require("mongodb");
const { User } = require("../models");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    res.status(200).json(getAllUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get user by id
const getUser = async (req, res) => {
  try {
    const thisId = new ObjectId(req.params.id);

    const getThisUser = await User.findById(thisId);

    if (getThisUser) {
      res.status(200).json(getThisUser);
    } else {
      res.status(404).json(`No user exists with id# ${thisId}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// create a user
const createUser = async (req, res) => {
  try {
    const newUser = User.create({
      username: req.body.username,
      email: req.body.email,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// update user by id
const updateUser = async (req, res) => {
  try {
    const thisId = new ObjectId(req.params.id);
    const updateThisUser = await User.findByIdAndUpdate(
      thisId,
      { username: req.body.username, email: req.body.email },
      { new: true }
    );

    if (updateThisUser) {
      res.status(200).json(updateThisUser);
    } else {
      res.status(404).json(`No user exists with id# ${thisId}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete a user
const deleteUser = async (req, res) => {
  try {
    const thisId = new ObjectId(req.params.id);
    const deleteThisUser = await User.findByIdAndRemove(thisId);

    if (deleteThisUser) {
      res.status(200).json(deleteThisUser);
    } else {
      res.status(404).json(`No user exists with id# ${thisId}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
