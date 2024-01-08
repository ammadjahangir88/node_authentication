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
        resp.status(200).json({ success: true, message: "Article Created Successfully"});

    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }

})

router.get('/articles', isAuth, async (req, resp) => {
    try {
        console.log(req.headers.authorization)
        
        const Articles = await Article.find().populate('author');
       
        // Extract only the necessary information for each article
        const formattedArticles = Articles.map(article => ({
            _id: article._id,
            title: article.title,
            image: article.imageURL,
            content: article.content,
            author: article.author.fullName, // Include only the 'name' field
            createdAt: article.createdAt,
        }));
    
    // // console.log('The author is %s', story.author.name);
        resp.status(200).json({ success: true, articles:formattedArticles });
       
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }

})

router.get('/article/:id', async (req,resp)=>{
    
    const { id } = req.params;

  try {
    const article = await Article.findById(id).populate('author');

    if (!article) {
      return resp.status(404).json({ success: false, message: 'Article not found' });
    }
    resp.status(200).json({ success: true, article });
  } catch (error) {
    console.log(error)
    resp.status(500).json({ success: false, message: 'Internal server error' });
  }
})




module.exports = router