const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReactions,
  deleteReactions,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getThoughts);

// /api/thoughts/:userId
router.route('/:userId/')
  .post(createThoughts);

// /api/thoughts/:id
router.route('/:id')
  .get(getSingleThought)
  .delete(deleteThoughts)
  .put(updateThoughts);

// /api/thoughts
router.route('/:thoughtId')
  .post(addReactions);

// /api/thoughtId/reactionId
router.route('/:reactionId')
  .delete(deleteReactions);

module.exports = router;
