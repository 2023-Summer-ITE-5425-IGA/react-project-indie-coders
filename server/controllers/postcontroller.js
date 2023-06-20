// controllers/postController.js
const Post = require('../model/postmodel');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { username, date, time, like, comments, content } = req.body;
    const post = new Post({
      username,
      date,
      time,
      like,
      comments,
      content,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { username, date, time, like, comments, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        username,
        date,
        time,
        like,
        comments,
        content,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
