const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const cleanCache = require('../middlewares/cleanCache');

module.exports = app => {
    app.get('/api/blogs', requireLogin, async (req, res) => {
        const blogs = await Blog.find({ user: req.user.id })
        .cache({ hashKey: req.user.id });
        res.send(blogs);
    });

    app.post('/api/blogs', requireLogin, cleanCache, async (req, res) => {
        const { title, content } = req.body;

        const blog = new Blog({
            title,
            content,
            user: req.user.id
        });

        try {
            await blog.save();
            res.send(blog);
        } catch (err) {
            res.send(400, err);
        }
    });
};