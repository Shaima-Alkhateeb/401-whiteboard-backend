'use strict';

const express = require('express');
const router = express.Router();

const { Comment } = require('../models/index');

//Routes
router.get('/comment', getComment);
router.get('/comment/:id', getOneComment);
router.post('/comment', createComment);
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
  res.status(200).json({oneComment});
}

async function createComment(req, res) {
  let obj = req.body;
  let newComment = await Comment.create(obj);
  res.status(201).json(newComment);
}

async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedComment = await Comment.update(id, obj);
  res.status(200).json(updatedComment);
}

async function deleteComment(req, res) {
  // const id = req.params.id;
  let id = parseInt(req.params.id);
  console.log('id from deleteComment', id);
  await Comment.delete( id );
  res.status(204).json({message: ` deleted the id: ${id}`});
}

module.exports = router;
