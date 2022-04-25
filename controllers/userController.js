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
}