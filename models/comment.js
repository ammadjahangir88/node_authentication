const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  // Additional comment-related fields (e.g., timestamp, likes, etc.)
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
