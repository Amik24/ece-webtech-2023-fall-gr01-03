// articles.js
const express = require('express');
const router = express.Router();
const db = require('./db');  // Import your database

//... your route handlers here, e.g.
router.get('/', (req, res) => {
  res.json(db.comments);
});

module.exports = router;
