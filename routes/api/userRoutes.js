const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userControllers');

router.route('/').get(getUsers).post(addUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;