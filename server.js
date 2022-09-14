'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');

// apllication level middleware
app.use(cors());
app.use(express.json());
app.use(postRouter);
app.use(commentRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Testing Home page',
    code: 200
  });
});

// Error handlers
app.use(errorHandler);
app.use('*', notFound);

function start(port) {
  app.listen(port || 3001, () => console.log(`server is working yaahooo ^_^ on ${port}`));
}

module.exports = {
  start, // start: start
  app // app: app

};
