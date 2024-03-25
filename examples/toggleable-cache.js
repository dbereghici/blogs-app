const util = require('util');
const mongoose = require('mongoose');

const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

// Extend the `Query` prototype of Mongoose with a new method.
// By doing this, we're adding a new method cache to all Mongoose queries.
mongoose.Query.prototype.cache = function () {
    this.useCache = true;
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    const cachedValue = await client.get(key);
    if (cachedValue) {
        const doc = JSON.parse(cachedValue);
        return Array.isArray(doc)
            ? doc.map(x => new this.model(x))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    await client.set(key, JSON.stringify(result));
    return result;
}
