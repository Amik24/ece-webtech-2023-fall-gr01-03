const express = require('express');
const articlesRoutes = require('./articles');
const commentsRoutes = require('./comments');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use your routes
app.use('/articles', articlesRoutes);
//... and similarly for comments

// Use your routes
app.use('/comments', commentsRoutes);
//... and similarly for comments


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





