const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/reset',
    [body('password')
        .trim()
        .isLength({ min: 8 }),
    body('confirmPassword')
        .trim()
        .isLength({ min: 8 })]
    , authController.postReset);

router.post('/find',
    [body('email')
        .trim()
        .isEmail()
        .normalizeEmail()]
    , authController.postFind);

router.put('/signup',
    [body('email')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 }),
    body('confirmPassword')
        .trim()
        .isLength({ min: 8 })]
    , authController.putSignUp);

router.post('/login',
    [body('email')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 })]
    , authController.postLogin);

router.post('/account',
    [body('email')
        .trim()
        .isEmail()
        .normalizeEmail()]
    , authController.postAccount);

module.exports = router;