const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id', 'title', 'contents', 'user_id', 'created_at'], 
      include: [{ model: Comment }, { model: User }],
    });

    // failed attempt at getting user on post too: try again later
    // const posts = dbPostData.map((post) => {
    //   const plainPost = post.get({ plain: true }); 
    //   plainPost.userName = post.User.name;
    //   return plainPost;
    // });

    const postData = dbPostData.map((post) => post.get({ plain: true }));
    postData.forEach(post => {
      post.created_at_formatted = new Date(post.created_at).toLocaleDateString();
    });

    res.render('homepage', {
      posts: postData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
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
          'title',
          'contents',
          'user_id',
          'created_at'
        ]}]
      });
    
    const user = dbUserData.get({ plain: true });
    
    // user.posts = dbUserData.posts.map((post) => post.get({ plain: true }));
    user.posts.forEach(post => {
      post.created_at_formatted = new Date(post.created_at).toLocaleDateString(); 
    });

    res.render('dashboard', { user, logged_in: req.session.logged_in, user_id: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User, 
          attributes: ['id', 'username']
        },
        {
          model: Comment,
          attributes: ['id', 'contents', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['id', 'username']
          }
        }
      ]
    });
    
    const post = postData.get({ plain: true });
    
    post.created_at_formatted = new Date(post.createdAt).toLocaleDateString();
    
    post.comments = post.comments || [];
    
    if (Array.isArray(post.comments)) {
      for (let i = 0; i < post.comments.length; i++) {
        const commentData = post.comments[i];
        const comment = await Comment.findOne({
          where: { id: commentData.id },
          include: {
            model: User,
            attributes: ['id', 'username']
          }
        });
        
        post.comments[i] = comment.get({ plain: true });
        post.comments[i].user.username = comment.user.username;
        post.comments[i].created_at_formatted = new Date(post.comments[i].createdAt).toLocaleDateString();
      }
    }
    
    res.render('article', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
