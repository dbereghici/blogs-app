const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');

module.exports = app => {
    app.get('/api/blogs', requireLogin, async (req, res) => {
        const blogs = await Blog.find({ user: req.user.id })
        // After the find operation, we call the cache method that we defined earlier. 
        //This sets the useCache property of the query to true, indicating that caching should be enabled for this query.
        .cache();
        res.send(blogs);
    });
};