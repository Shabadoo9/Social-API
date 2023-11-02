const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            defualt: Date.now(),
            get: (date) => {
                return date.toLocaleString();
            },
        }
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
        timestamps: { createdAt: true, updatedAt: false },
    }
);

module.exports = reactionSchema;