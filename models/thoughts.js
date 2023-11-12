// Imports
const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Thought schema
const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    meta: {
      upvotes: Number,
      bookmarks: Number,
    },
    text: {
      type: String,
      minLength: 15,
      maxLength: 500,
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