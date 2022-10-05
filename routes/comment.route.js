'use strict';

const express = require('express');
const router = express.Router();

// const { userModel, commentModel } = require('../models/index');
const { Comment } = require('../models/index');

//Routes
router.get('/comment', getComment);
router.get('/comment/:id', getOneComment);
router.post('/comment', createNewComment);
router.get('/comment/:post_id/:user_id', createComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);

//call the function
async function getComment(req, res) {
  let allComments = await Comment.read();
  res.status(200).json(allComments);
}

async function getOneComment(req, res) {
  const id = req.params.id;
  let oneComment = await Comment.read(id);
  res.status(200).json(oneComment);
}

async function createNewComment(req, res) {
  let obj = req.body;
  let newComment = await Comment.create(obj);
  res.status(201).json(newComment);
}

async function createComment(req, res) {
  // const obj = req.body.comment;
  console.log('req.body', req.params.post_id);
  // const post_id = req.body.post_id;
  const user_id = req.body.user_id;
  let comment = await Comment.read( user_id);

  // let newComment = await Comment.create(obj, post_id, user_id);
  res.status(201).json(comment);

}

async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedComment = await Comment.update(id, obj);
  res.status(200).json(updatedComment);
}

async function deleteComment(req, res) {
  let id = req.params.id;
  let deletedComment = await Comment.delete(id);
  res.status(204).json(deletedComment);
}

module.exports = router;
