const { Schema, Types, model } = require('mongoose');

// Schema to create a reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      require: true,
      maxlength: 280
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //! Use a getter method to format the timestamp on query ASKKK !
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoguhtText: {
      type: String,
      require: true,
      minlength: 1,
      maxlength: 280
    },
    reactionBody: {
      type: String,
      require: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //! Use a getter method to format the timestamp on query ASKKK !
    },
    username: {
      type: String,
      require: true,
    },
    reactions:
      [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
  }
);


thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
