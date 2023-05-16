const router = require('express').Router();
const { Post } = require('../../models');

// GET route for all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for a single post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route to update an existing post by id
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const updatedPostData = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete an existing post by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json({ message: 'Post successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

