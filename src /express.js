const express = require('express');
const articlesRoutes = require('./articles');
const commentsRoutes = require('./comments');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/articles', articlesRoutes);


app.use('/comments', commentsRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





