const { User, Thought } = require('../models');

module.exports = {

  // Get all Users
  getUser(req, res) {
    User.find()
      .populate('friends')
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single student
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('friends')
      .select('-__v')
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json({ users })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No users with this id!' })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No users with this id!' })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendsId } },
      { new: true })
      .select('-__v')
      .populate('friends')
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No users with this id!' })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // remove friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { new: true })
      .select('-__v')
      .populate('friends')
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No users with this id!' })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}