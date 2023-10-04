// articles.js
const express = require('express');
const router = express.Router();
const db = require('./db');  // Import your database

// POST /articles - add a new article
router.post('/', (req, res) => {
  const newArticle = {
    id: '6ec1bd7f-11c0-43da-975e-2a8ad9ebae0b',  // Hard-coded ID and data
    title: 'My article test',
    content: 'Content of the article test.',
    date: '04/10/2022',
    author: 'Liza Gringer'
  };

  db.articles.push(newArticle); // This is important!
  res.status(201).json(newArticle);  // Send back the newly created article as response
});

// GET /articles - get all articles
router.get('/', (req, res) => {
  res.json(db.articles);
});

// GET /articles/:articleId - get an article by ID
router.get('/:articleId', (req, res) => {
    // Capture the articleId from the URL
    const articleId = req.params.articleId;

    // Find the article with the corresponding ID in the database
    const article = db.articles.find(a => a.id === articleId);

    // If the article was found, send it as a response
    if (article) {
        res.json(article);
    } else {
        // If no article was found, send a 404 Not Found status with an error message
        res.status(404).json({ message: 'Article not found' });
    }
});


// GET /articles/:articleId/comments - get all comments for a specific article
router.get('/:articleId/comments', (req, res) => {
    // Capture the articleId from the URL
    const articleId = req.params.articleId;

    // Filter comments that are associated with the given article ID
    const commentsForArticle = db.comments.filter(comment => comment.articleId === articleId);

    // If there are comments for the article, send them as a response
    if (commentsForArticle.length) {
        res.json(commentsForArticle);
    } else {
        // If no comments were found for the article, send a message indicating so
        res.status(200).json({ message: 'No comments found for this article' });
    }
});



module.exports = router;

