const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // To handle CORS
app.use(express.json()); // To parse JSON request body

// Your database as you provided
const db = {
    
     articles: [
        {
            id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
            title: 'My article',
            content: 'Content of the article.',
            date: '04/10/2022',
            author: 'Liz Gringer'
        },
        {
            id: '7',
            title: 'My article',
            content: 'Content of the article.',
            date: '04/10/2022',
            author: 'Liz Gringer'
        },
          
          
          // ...
    ],
    comments: [
        {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            timestamp: 1664835049,
            content: 'Content of the comment.',
            articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
            author: 'Bob McLaren'
          },
        // ...
    ]
      
      
};


// (Continued from the server.js file)

// Get all articles
app.get('/articles', (req, res) => {
  res.json(db.articles);
});

// Add a new article
app.post('/articles', (req, res) => {
  // ... Add article to db and send a response ...
});

// Get article by ID
app.get('/articles/:articleId', (req, res) => {
  // ... Fetch and send article based on ID ...
});

// Get all comments of the article with articleId
app.get('/articles/:articleId/comments', (req, res) => {
  // ... Fetch comments based on article ID ...
});

// Add a new comment to a specific article
app.post('/articles/:articleId/comments', (req, res) => {
  // ... Add comment and send a response ...
});

// Get a comment by ID of a specific article
app.get('/articles/:articleId/comments/:commentId', (req, res) => {
  // ... Fetch and send the specific comment ...
});


// ... Define routes ...

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
