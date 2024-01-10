const express = require('express');
const Comment = require('../models/comment')
const router = express.Router();
const { isAuth } = require('../middlewares/auth')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
router.post('/create-comment', isAuth, async (req, resp) => {
  try {
    const { text, article } = req.body;
    const { user } = req
    const newComment = new Comment({
      text,
      author: user._id,
      article: article,
    });
    const savedComment = await newComment.save();

    resp.status(201).json(savedComment);
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
})


router.get('/comments/:articleId', isAuth, async (req, resp) => {

  try {
    const articleId = req.params.articleId;

    // Use mongoose.Types.ObjectId without the 'new' keyword
    const comments = await Comment.find({ article: new ObjectId(articleId) }).populate('author');
    console.log(comments);

    resp.status(200).json({ success: true, comments });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }

})
module.exports = router