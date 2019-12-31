const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gamesSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Games', gamesSchema);