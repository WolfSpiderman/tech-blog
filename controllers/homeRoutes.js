const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        dbPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'message']
                },
            ],
        });

        const posts = dbPostData.map((post) => 
        post.get({ plain: true }));

        res.render('homepage', {
            posts, 
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});