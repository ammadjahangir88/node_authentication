const mongoose=require('mongoose')

const articleSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now

    },
    imageURL: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
