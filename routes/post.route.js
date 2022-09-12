'use strict';

const express = require('express');
const router = express.Router();

const { Post } = require('../models/index');

//Routes
router.get('/post', getPost);
router.get('/post/:id', getOnePost);
router.post('/post', createPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

//call the function
async function getPost(req, res) {
  let allPosts = await Post.findAll();
  res.status(200).json(allPosts);
}

async function getOnePost(req, res) {
  const id = parseInt(req.params.id);
  let onePost = await Post.findOne({ where: { id: id } });
  res.status(200).json(onePost);
}

async function createPost(req, res) {
  let obj = req.body;
  let newPost = await Post.create(obj);
  res.status(201).json(newPost);
}

async function updatePost(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let updatedPost = await Post.update(obj, { where: { id: id } });
  res.status(200).json(updatedPost);
}

async function deletePost(req, res) {
  const id = parseInt(req.params.id);
  let deletedPost = await Post.destroy({ where: { id: id } });
  res.status(204).json(deletedPost);
}

module.exports = router;
