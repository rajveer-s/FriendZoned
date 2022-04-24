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
router.route('/').get(getThoughts);

// /api/thoughts/:userId
router.route('/:userId/').post(createThoughts);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThoughts).delete(deleteThoughts);

// /api/thoughts/reactions
router.route('/:thoughtId/reactions').post(addReactions);

// /api/thoughtId/reactionId
router.route('/:thoughtId/:reactionId').delete(deleteReactions);

module.exports = router;
