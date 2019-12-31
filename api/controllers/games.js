const User = require('../models/user');
const Games = require('../models/games');

exports.postGame = (req, res, next) => {
    const userId = req.body.userId;
    const gameTitle = req.body.game;
    let loadedUser;
    Games.findOne({ game: gameTitle, creator: userId })
        .then(game => {
            if (game) {
                const error = new Error('Already added!');
                error.statusCode = 501;
                throw error;
            } else {
                User.findById(userId)
                    .then(user => {
                        if (!user) {
                            const error = new Error('User not found!');
                            error.statusCode = 500;
                            throw error;
                        }
                        loadedUser = user;
                        const game = new Games({
                            game: gameTitle,
                            creator: userId
                        });
                        game.save()
                            .then(newgame => {
                                return user.addGames(gameTitle);
                            })
                            .then(result => {
                                const games = [];
                                loadedUser.myGames.map(data => {
                                    return games.push(data.game);
                                });
                                res.status(201).json({ message: 'success', games: games });
                            });
                    })
                    .catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteGame = (req, res, next) => {
    const userId = req.body.userId;
    const gameTitle = req.body.game;
    let loadedUser;
    Games.deleteOne({ game: gameTitle, creator: userId })
        .then(user => {
            User.findById(userId)
                .then(user => {
                    if (!user) {
                        const error = new Error('User not found!');
                        error.statusCode = 404;
                        throw error;
                    }
                    loadedUser = user;
                    return user.deleteGames(gameTitle);
                })
                .then(result => {
                    const games = [];
                    loadedUser.myGames.map(data => {
                        return games.push(data.game);
                    });
                    res.status(200).json({ message: 'success', games: games });
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};