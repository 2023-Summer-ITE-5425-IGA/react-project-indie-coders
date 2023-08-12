// careerroute.js
const express = require('express');
const router = express.Router();

// Define your career-related routes here
router.get('/', (req, res) => {
  // Return your career page content here
  res.send('Welcome to our Career Page');
});

module.exports = router;
