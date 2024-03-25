const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const cleanCache = require('../middlewares/cleanCache');

module.exports = app => {
    app.get('/api/blogs', requireLogin, async (req, res) => {
        const blogs = await Blog.find({ user: req.user.id })
        // Specify the Top Level (hashset) key
        .cache({ hashKey: req.user.id });
        res.send(blogs);
    });
};