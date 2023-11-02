const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to add a thought
    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.status(404).json({ message: "Body must include valid user id!" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: { thoughtText: req.body.thoughtText } },
                { runValidators: true, new: true }
            );

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'The thought was deleted, but it\'s user was not found!' });
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to add a reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            };

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } }},
                { runValidators: true, new: true }
            );

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            };

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}