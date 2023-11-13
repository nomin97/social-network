// Imports
const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Thought schema
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    meta: {
      upvotes: Number,
      bookmarks: Number,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//  creates virtual property reaction 
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initialize model
const Thought = model("thought", thoughtSchema);

// Exports
module.exports = Thought;