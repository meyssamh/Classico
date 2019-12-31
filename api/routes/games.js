const express = require('express');

const gamesController = require('../controllers/games');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/post', isAuth, gamesController.postGame);

router.delete('/delete', isAuth,  gamesController.deleteGame);

module.exports = router;