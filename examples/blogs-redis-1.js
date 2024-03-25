const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');

const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);

module.exports = app => {
    app.get('/api/blogs', requireLogin, async (req, res) => {
        // Do we have any cached data in redis related to this query?
        const cachedBlogs = await client.get(req.user.id);

        // If yes, then respond to the request right away and return
        if (cachedBlogs) {
            return res.send(JSON.parse(cachedBlogs));
        }

        // If not, we need to respond to request and update our cache to store the data
        const blogs = await Blog.find({ authorId: req.user.id });
        res.send(blogs);

        client.set(req.user.id, JSON.stringify(blogs));
    });
};