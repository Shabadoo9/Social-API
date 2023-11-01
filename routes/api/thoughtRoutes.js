const router = require('express').Router();
const { 
    getAll,
    getSingle,
    addNew,
    update,
    remove,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsControllers');

router.route('/').get(getAll).post(addNew);

router.route('/:thoughtId').get(getSingle).put(update).delete(remove);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;