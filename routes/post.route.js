'use strict';

const express = require('express');
const router = express.Router();
// jest.setTimeout(5000);

const { Post, commentModel, postModel, userModel } = require('../models/index');
const { Comment } = require('../models/index'); // with add the include to the findAll


//Routes
// router.get('/post', getPost);
router.get('/post', getPostWithComment);
// router.get('/post/:id', getOnePost);
router.get('/post/:id', getOnePostWithComment);
// router.get('/getPostWithComment', getPostWithComment);// new routes

router.post('/post', createPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

//-----------------------------------------

//call the function
// async function getPost(req, res) {
//   let allPosts = await Post.read();
//   res.status(200).json(allPosts);
// }
async function getPostWithComment(req, res) {
  let allComments = await commentModel.findAll({include: [userModel]});
  let allPosts = await postModel.findAll({include: [userModel]});

  allPosts.forEach(post => {
    post.allComments = allComments.filter(comment => {return comment.post_id === post.id;});
    return post;
  });
  const response = allPosts.map(post => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      allComments: post.allComments.map(comment => {
        return {
          id: comment.id,
          comment: comment.comment,
          name: comment.name,
          post_id: comment.post_id,
        };
      }),
    };
  });
  res.status(200).json(response);
}

// async function getOnePost(req, res) {
//   const id = req.params.id;
//   let onePost = await Post.read(id);
//   res.status(200).json(onePost);
// }
async function getOnePostWithComment(req, res) {
  const id = req.params.id;
  let allComments = await commentModel.findAll({where:{post_id: id }, include: [userModel]});

  let post = await postModel.findOne({where:{id: id }, include: [userModel]});

  post.allComments = allComments;
  res.status(200).json(post);
}

async function createPost(req, res) {
  let obj = req.body;
  await Post.create(obj).then(async () => {
    await Post.read().then(data => {
      res.status(201).json(data);
    });
  });

}

async function updatePost(req, res) {
  const id = req.params.id;
  // console.log('id from updatePost', id);
  const obj = req.body;
  let updatedPost = await Post.update( id ,obj);
  res.status(200).json(updatedPost);
}

async function deletePost(req, res) {
  const id = req.params.id;
  let allComments = await commentModel.findAll({where:{post_id: id }});
  allComments.forEach(async comment => {
    await commentModel.destroy({where:{id: comment.id}});
  });
  await Post.delete(id).then( () => {
    res.status(204).json({message: ` deleted the id: ${id}`});
  });
}

// async function getPostWithComment(req, res) { // new function
//   let allPosts = await Post.readWithComment(commentModel);
//   res.status(200).json(allPosts);
// }

module.exports = router;
