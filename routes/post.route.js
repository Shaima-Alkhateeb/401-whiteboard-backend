'use strict';

const express = require('express');
const router = express.Router();
// jest.setTimeout(5000);

const { Post, commentModel, postModel, userModel,  } = require('../models/index');
// const { Comment } = require('../models/index'); // with add the include to the findAll
const acl = require('../middlewares/acl');
const bearerAuth = require('../middlewares/bearer-auth');

//Routes
router.get('/post',bearerAuth, acl('read'), getPost);
// router.get('/post',bearerAuth, acl('read'), getPostWithComment);
router.get('/post/:id',bearerAuth, acl('read'), getOnePost);
// router.get('/post/:id',bearerAuth, acl('read'), getOnePostWithComment);
router.get('/post/user/:id',bearerAuth, acl('read'), getPostByUser);

router.post('/post/:user_id',bearerAuth, acl('create'), createPost);
router.put('/post/:id',bearerAuth, acl('update'), updatePost);
router.delete('/post/:id',bearerAuth, acl('delete'), deletePost);

//-----------------------------------------

//call the function
async function getPost(req, res) {
  let allPosts = await Post.readWithComment(commentModel);
  res.status(200).json(allPosts);
}

async function getOnePost(req, res) {
  const id = req.params.id;
  let onePost = await Post.readWithComment(commentModel,id);
  res.status(200).json(onePost);
}

async function getPostByUser(req, res) {
  const id = req.params.id;
  let onePost = await Post.readWithCommentAndUser(commentModel,id);
  res.status(200).json(onePost);
}


async function createPost(req, res) {
  let obj = req.body;
  const user_id = req.params.user_id;
  obj.user_id = user_id;
  // await Post.create(obj).then(async () => {
  //   // await Post.read().then(data => {
  //   //   res.status(201).json(data);
  //   // });
  //   res.status(201).json({message: 'post created'});
  // });
  let newPost = await Post.create(obj);
  res.status(201).json(newPost);

}

async function updatePost(req, res) {
  const id = req.params.id;
  // console.log('id from updatePost', id);
  const obj = req.body;
  let foundPost = await Post.read(id);
  let updatedPost = await foundPost.update( id ,obj);
  try {
    res.status(200).json(updatedPost);
  } catch {
    res.status(500).json({message: 'Error in updating the post'});
  }
  // res.status(200).json(updatedPost);
}

async function deletePost(req, res) {
  const id = req.params.id;
  // let allComments = await commentModel.findAll({where:{post_id: id }});
  // allComments.forEach(async comment => {
  //   await commentModel.destroy({where:{id: comment.id}});
  // });
  // await Post.delete(id).then( () => {
  //   res.status(204).json({message: ` delete the post of the id: ${id}`});
  // });
  let deletedPost = await Post.delete(id);
  res.status(204).json('deletedPost', deletedPost);
}

// async function getPostWithComment(req, res) { // new function
//   let allPosts = await Post.readWithComment(commentModel);
//   res.status(200).json(allPosts);
// }

module.exports = router;
