// Imports
const { User, Thought } = require("../models/thoughts");

// Get all thoughts
module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
         res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      
      if (!user) {
        return res.status(404).json({ message: 'Thought created, but found no user with that ID' });
      }
      res.json('Thought created!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
       res.status(404).json({ message: "No thought with this id" });
      }
       res.status(200).json(thought);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
         res.status(404).json({ message: "No thought with that ID" });
      }
       res.status(200).json({
        message: "Thought & associated reactions successfully deleted",
      });
    } catch (err) {
      console.log(err);
       res.status(500).json(err);
    }
  },

  // Add reaction
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
      );
      if (!reaction) {
       res.status(404).json({ message: "No thought with that ID" });
      }
       res.status(200).json(reaction);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        res.status(404).json({ message: "Check thought and reaction ID" });
      }

       res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
       res.status(500).json(err);
    }
  },
};
