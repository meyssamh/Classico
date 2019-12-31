const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    myGames: [
        {
            game: {
                type: String,
                ref: 'Games'
            }
        }
    ]
});

userSchema.methods.addGames = function (title) {
    const updatedGames = [...this.myGames];
    let x = 0;
    let index = -1;

    for (; x < updatedGames.length; ++x) {
        if (updatedGames[x].game === title) {
            index = x;
        }
    }

    if (index === -1) {
        updatedGames.push({ game: title });
    } else {
        const error = new Error('Game already exists!');
        error.statusCode = 500;
        throw error;
    }

    this.myGames = updatedGames;
    return this.save();
};

userSchema.methods.deleteGames = function (title) {
    const updatedGames = [...this.myGames];
    let x = 0;
    let index;

    for (; x < updatedGames.length; ++x) {
        if (updatedGames[x].game === title) {
            index = x;
        }
    }

    if (index === undefined) {
        const error = new Error('Game not found!');
        error.statusCode = 404;
        throw error;
    }

    delete updatedGames[index];

    this.myGames = updatedGames;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);