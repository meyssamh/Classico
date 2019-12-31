const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

/*  Because of US sanktions against Iran i can not log into
    my account in sendgrid and generate an api_key.
    Sadly you have to do it yourself if you want to check if
    my code works!

    I am really sorry. :(( */
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: ''
    }
}));

exports.postReset = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        throw error;
    }
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const passwordToken = req.body.passwordToken.token;
    let resetUser;
    if (password === confirmPassword) {
        User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: { $gt: Date.now() }
        })
            .then(user => {
                if (!user) {
                    const error = new Error('Invalid User!');
                    error.statusCode = 404;
                    throw error;
                }
                resetUser = user;
                return bcrypt.hash(password, 12);
            })
            .then(hashedPassword => {
                resetUser.password = hashedPassword;
                resetUser.resetToken = undefined;
                resetUser.resetTokenExpiration = undefined;
                return resetUser.save();
            })
            .then(result => {
                res.status(200).json({ message: 'success' })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } else {
        const error = new Error('Password and confirm password do not match');
        error.statusCode = 401;
        throw error;
    }
}

exports.postFind = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            err.statusCode = 500;
            throw err;
        }
        const token = buffer.toString('hex');
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    const error = new Error('Invalid email!');
                    error.statusCode = 404;
                    throw error;
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.status(200).json({ message: 'success' });
                // return transporter.sendMail({
                //     to: email,
                //     from: 'info@classico.com',
                //     subject: 'Reseting Password',
                //     html: `<h1>Hello dear user!</h1>
                //     <br>
                //     <p>You requested a password reset!</p>
                //     <br>
                //     <p>If you want to reset your password please click on this 
                //     <a hreft="http://localhost:3000/reset/${token}">link</a>!</p> `
                // });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    })
}

exports.putSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    let loadedUser;
    if (password === confirmPassword) {
        bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    games: []
                });
                loadedUser = user;
                return user.save();
            })
            .then(result => {
                const games = loadedUser.myGames.map(data => {
                    return data.game;
                });
                const token = jwt.sign(
                    {
                        email: loadedUser.email,
                        userId: loadedUser._id.toString()
                    },
                    'benamekhodavandejanafarin,hakimesokhanbarzabanafarin,azferdousi'
                );
                res.status(201).json(
                    {
                        message: 'success', email: loadedUser.email, games: games,
                        userId: loadedUser._id.toString(), token: token
                    }
                );
                // return transporter.sendMail({
                //     to: email,
                //     from: 'info@classico.com',
                //     subject: 'Signing up succeeded',
                //     html: `<h1>Hello dear user!</h1>
                //     <br>
                //     <p>you have successfuly signed up in classico!</p>`
                // });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } else {
        const error = new Error('Password and confirm password do not match');
        error.statusCode = 401;
        throw error;
    }
}

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(' Validation failed');
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('Invalid email!');
                error.statusCode = 404;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(result => {
            if (!result) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }
            const games = loadedUser.myGames.map(data => {
                return data.game;
            });
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'benamekhodavandejanafarin,hakimesokhanbarzabanafarin,azferdousi'
            );
            res.status(200).json(
                {
                    message: 'success', email: loadedUser.email, games: games,
                    userId: loadedUser._id.toString(), token: token
                }
            );
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postAccount = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(201).json({ message: 'success', email: email });
            }
            if (user) {
                res.status(200).json({ message: 'success', email: email });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}