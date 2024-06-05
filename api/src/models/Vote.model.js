const mongoose = require('mongoose');

const MovieVoteSchema = mongoose.Schema({
  voteAvarage: {
    type: Number,
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('MovieVote', MovieVoteSchema);
