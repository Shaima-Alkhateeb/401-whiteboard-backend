'use strict';

const express = require('express');
const router = express.Router();
// jest.setTimeout(5000);

const { Post, commentModel } = require('../models/index');
const { Comment } = require('../models/index'); // with add the include to the findAll


//Routes
router.get('/post', getPost);
router.get('/post/:id', getOnePost);
router.get('/getPostWithComment', getPostWithComment);// new routes
router.post('/post', createPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


//call the function
async function getPost(req, res) {
  let allPosts = await Post.read();
  res.status(200).json(allPosts);
}

async function getOnePost(req, res) {
  const id = req.params.id;
  let onePost = await Post.read(id);
  res.status(200).json(onePost);
}

async function createPost(req, res) {
  let obj = req.body;
  let newPost = await Post.create(obj);
  res.status(201).json(newPost);
}

async function updatePost(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedPost = await Post.update(obj, { where: { id: id } });
  res.status(200).json(updatedPost);
}

async function deletePost(req, res) {
  const id = req.params.id;
  await Post.delete(id);
  res.status(204).json({message: ` deleted the id: ${id}`});
}

async function getPostWithComment(req, res) { // new function
  let allPosts = await Post.readWithComment(commentModel);
  res.status(200).json(allPosts);
}

module.exports = router;
