// Imports
const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Thought schema
const thoughtSchema = new Schema(
  {
    thought: {
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
        type: String,
        required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    reactions: [
      reactionSchema
    ]
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