const { ObjectId } = require("mongodb");
const { User, Thought } = require("../models");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find()
      .populate(["thoughts", "friends"])
      .select("-__v");
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

    const getThisUser = await User.findById(thisId)
      .populate(["thoughts", "friends"])
      .select("-__v");

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
    const newUser = await User.create({
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
    const deleteThisUser = await User.findByIdAndRemove(req.params.id);

    if (!deleteThisUser) {
      res.status(404).json(`No user exists with id# ${req.params.id}`);
    }
    await Thought.deleteMany({ _id: { $in: deleteThisUser.thoughts } });

    res.status(200).json(`user with id# ${req.params.id} has been deleted`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add a friend to a user
const addFriend = async (req, res) => {
  try {
    const addFriendToMyList = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .populate("friends")
      .select("-__v");

    if (!addFriendToMyList) {
      res
        .status(404)
        .json(`user with id# ${req.params.friendId} does not exist`);
    }

    res.status(200).json(addFriendToMyList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// remove a friend
const removeFriend = async (req, res) => {
  try {
    const removeFriendFromMyList = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .populate("friends")
      .select("-__v");

    if (!removeFriendFromMyList) {
      res
        .status(404)
        .json(`User with id# ${req.params.friendId} does not exist`);
    }
    res.status(200).json(removeFriendFromMyList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
