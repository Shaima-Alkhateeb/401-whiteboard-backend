'use strict';

const express = require('express');
const { signup, allUser, signin } = require('../controllers/userController');
const { saveUser } = require('../middlewares/userAuth');
const bearerAuth = require('../middlewares/bearer-auth');


const router = express.Router();
// const router = require('express').Router();

// router.post('/signup', (req, res) => {
//   res.status(201).send('Sign up');
// });
router.post('/signup', saveUser, signup);

// router.post('/signin', saveUser, (req, res) => {
//   res.status(201).send('Sign in');
// });
router.post('/signin', bearerAuth, signin);

router.get('/users', bearerAuth, allUser);

module.exports = router;
