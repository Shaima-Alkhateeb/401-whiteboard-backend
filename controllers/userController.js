'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const User = require('../models').userModel;
const Post = require('../models').postModel;
const Comment = require('../models').commentModel;

const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    };
    // console.log(data);

    const user = await User.create(data);

    const output = {
      User: {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
        capabilities: user.capabilities,
      },
      token: user.token,
    };

    if (user) {
      res.status(200).json(output);
    }
  } catch (e) {
    console.log(e);
  }
};

const signin = async (req, res) => {
  const basicHeader = req.headers.authorization.split(' ');
  // console.log(basicHeader); //[ 'Basic', 'c2hhaW1hQDIyMi5jb206MjIy' ]
  const encodedValue = basicHeader.pop(); // tack the last value and pop it
  // console.log(encodedValue); //c2hhaW1hQDIyMi5jb206MjIy
  const decodedValue = base64.decode(encodedValue);
  console.log(decodedValue); // email:pass
  const [email, password] = decodedValue.split(':');

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      const output = {
        User: {
          username: user.username,
          email: user.email,
          role: user.role,
          id: user.id,
          capabilities: user.capabilities,
        },
        token: user.token,
      };
      return res.status(200).json(output);
    } else {
      return res.status(401).send('You are not authorized');
    }
  } else {
    return res.status(401).send('You are not authorized');
  }
};

const allUser = async (req, res) => {
  // console.log(req.token);
  // console.log(req.user);
  const users = await User.findAll({ include: [Post, Comment] });

  const output = users.map((user) => {
    return {
      User: {
        userName: user.userName,
        email: user.email,
        id: user.id,
        role: user.role,
        capabilities: user.capabilities,
        Posts: user.Posts,
        Comments: user.Comments,
      },
    };
  });
  res.json(output);
};

const oneUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    include: [Post, Comment],
  });
  res.status(200).json(user);
};

module.exports = {
  signup,
  allUser,
  signin,
  oneUser
};
