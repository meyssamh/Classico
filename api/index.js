const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games');

const MONGODB_URI_CONNECT = 'localhost:27017/classico';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRouter);
app.use('/game', gamesRouter);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(
    MONGODB_URI_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }
)
    .then(result => {
        app.listen(8080);
    })
    .catch(error => {
        console.log('Can not connect to Database! -> ', error);
    });