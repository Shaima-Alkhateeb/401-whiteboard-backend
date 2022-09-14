'use strict';

const express = require('express');
const router = express.Router();
// jest.setTimeout(5000);

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
  const id = parseInt(req.params.id);
  let oneComment = await Comment.read(id);
  res.status(200).json(oneComment);
}

async function createComment(req, res) {
  let obj = req.body;
  let newComment = await Comment.create(obj);
  res.status(201).json(newComment);
}

async function updateComment(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let updatedComment = await Comment.update(obj, { where: { id: id } });
  res.status(200).json(updatedComment);
}

async function deleteComment(req, res) {
  const id = parseInt(req.params.id);
  let deletedComment = await Comment.delete({ where: { id: id } });
  res.status(204).json(deletedComment);
}

module.exports = router;