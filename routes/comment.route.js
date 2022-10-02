'use strict';

const express = require('express');
const router = express.Router();

// const { userModel, commentModel } = require('../models/index');
const { Comment } = require('../models/index');

//Routes
router.get('/comment', getComment);
router.get('/comment/:post_id', getOneComment);
router.post('/comment/:post_id/:user_id', createComment);
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

async function createComment(req, res) {
  const obj = req.body.comment;
  const post_id = req.params.post_id;
  const user_id = req.params.user_id;

  let newComment = await Comment.create(obj, post_id, user_id);
  res.status(201).json(newComment);


  // let content = await userModel.findOne({where: {id: user_id}});
  // let Data = { comment: req.body.comment, post_id: post_id, user_id: user_id, name: content.name};

  // await commentModel.create(Data).then( async () => {
  //   await commentModel.findAll({where:{post_id: post_id, user_id: user_id}, include: [userModel]}).then(data => {
  //     const response = data.map(comment => {
  //       return {
  //         id: comment.id,
  //         comment: comment.comment,
  //         name: comment.name,
  //         post_id: comment.post_id,
  //       };
  //     });
  //     res.status(201).json(response);
  //   });
  // });
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
