const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id', 'name', 'contents', 'user_id', 'created_at'], 
      include: [{ model: Comment }],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // Check if user is already logged in and redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { id: req.params.id },
      include: [{ 
        model: Post,
         attributes: [
          'id',
          'name',
          'contents',
          'user_id',
          'created_at'
        ]}]
      });
    
    const user = dbUserData.get({ plain: true });
    
    // user.posts = dbUserData.posts.map((post) => post.get({ plain: true }));

    res.render('dashboard', { user, logged_in: true, user_id: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
