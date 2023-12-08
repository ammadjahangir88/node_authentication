const express = require('express');
const Article = require('../models/article')
const User=require('../models/user')
const router = express.Router();
const { isAuth } = require('../middlewares/auth')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder


router.post('/create-post',upload.single('image'),  isAuth, async (req, resp) => {
    const { title, content } = req.body;
    const { user: author } = req
    console.log(author)
    try {

        let article = new Article({
            title,
            content,
            author,
            imageURL: req.file ? req.file.path : null, // Save the file path or URL
        });
        await article.save();
        resp.status(200).json({ success: true, 
         });

    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }

})

router.get('/articles', isAuth, async (req, resp) => {
    try {
        
        const articles = await Article.find().populate('author');

        // Extract only the necessary information for each article
        const formattedArticles = articles.map(article => ({
            _id: article._id,
            title: article.title,
            content: article.content,
            author: article.author.name, // Include only the 'name' field
            createdAt: article.createdAt,
        }));
    
    // // console.log('The author is %s', story.author.name);
        resp.status(200).json({ success: true, formattedArticles });
       
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }

})




module.exports = router