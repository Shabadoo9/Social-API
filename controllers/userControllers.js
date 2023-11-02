const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST new user
    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: { username: req.body.username, email: req.body.email } },
                { runValidators: true, new: true }
            );

            if(!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User and associated Thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to add a new friend to a user's friends list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: req.params.friendId } },
                    { runValidators: true, new: true }
                );

                if(!user) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }

                res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a friend from a user's friends list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}