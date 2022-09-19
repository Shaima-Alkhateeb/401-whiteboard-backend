'use strict';

const express = require('express');
const { signup, allUser, signin } = require('../controllers/userController');
const { saveUser } = require('../middlewares/userAuth');
const router = express.Router();
// const router = require('express').Router();

// router.post('/signup', (req, res) => {
//   res.status(201).send('Sign up');
// });
router.post('/signup', saveUser, signup);

// router.post('/signin', saveUser, (req, res) => {
//   res.status(201).send('Sign in');
// });
router.post('/signin', signin);

router.get('/users', allUser);

module.exports = router;