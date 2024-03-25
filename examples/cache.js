const util = require('util');
const mongoose = require('mongoose');

const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

client.get = util.promisify(client.get);

//  stores a references to the original exec function (the untouched copy of it), the copy which should be executed any time a query is executed
const exec = mongoose.Query.prototype.exec;

// Intercept the execution of Mongoose queries by overriding the `exec` method of mongoose.Query.prototype.
// Note: Use function (no arrow function, because it will mess with the value of this)
mongoose.Query.prototype.exec = async function () {
  // Key creation - this will create a unique key consisting of the query object and the mongoose collection
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }));

  // Check if we have a value for 'key' in Redis
  const cachedValue = await client.get(key);

  // If we do, return that

  if (cachedValue) {
    // Hydrating models - parse JSON to mongoose model
    // If the cached value is an array, we map each item to a new Mongoose model instance
    // If it's a single document, we instantiate a new Mongoose model instance
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map(x => new this.model(x))
      : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in Redis

  // Run the original (untouched) exec function, with the original arguments
  const result = await exec.apply(this, arguments);

  // Set the result in cache
  await client.set(key, JSON.stringify(result));
  return result;
}