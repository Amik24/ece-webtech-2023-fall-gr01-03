// comments.js
const express = require('express');
const router = express.Router();
const db = require('./db');  // Import your database


// POST /articles/:articleId/comments - add a new comment to a specific article
router.post('/:articleId/comments', (req, res) => {
    // Capture the articleId from the route parameters
    const articleId = req.params.articleId;

    // Ensure the article exists before adding a comment
    const article = db.articles.find(article => article.id === articleId);
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }

    // Construct the new comment object
    const newComment = {
        id: '8',  // Generate a new unique ID for the comment
        timestamp: Date.now(),
        content: 'test comment',
        articleId: articleId,
        author: 'moi'
    };

    // Push the new comment to the database or mock data
    db.comments.push(newComment);

    // Respond with the newly added comment
    res.status(201).json(newComment);
});

// GET /articles/:articleId/comments/:commentId - get a comment by commentId of the article by articleId
router.get('/:articleId/comments/:commentId', (req, res) => {
    // Capture the articleId and commentId from the route parameters
    const articleId = req.params.articleId;
    const commentId = req.params.commentId;

    // Ensure the article exists
    const article = db.articles.find(article => article.id === articleId);
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }

    // Find the comment with the given commentId associated with the specified article
    const comment = db.comments.find(comment => comment.id === commentId && comment.articleId === articleId);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    // Respond with the found comment
    res.json(comment);
});


//... your route handlers here, e.g.
router.get('/', (req, res) => {
  res.json(db.comments);
});

module.exports = router;
