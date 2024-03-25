const util = require('util');
const mongoose = require('mongoose');

const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

// Change get with ghet
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

// Modify the cache function by adding an options object
// The options object should contaim a hashKey value, which will be used as top-level hash key
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.hashKey || '');

    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    // Change get to hget, pass the hashKey value
    const cachedValue = await client.hget(this.hashKey, key);
    if (cachedValue) {
        const doc = JSON.parse(cachedValue);

        return Array.isArray(doc)
            ? doc.map(x => new this.model(x))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    // Change set to hset, pass the hashKey value
    await client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 100);
    return result;
}

module.exports = {
    clearHash(hashKey){
        client.del(JSON.stringify(hashKey));
    }
};