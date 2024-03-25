module.exports = {
    clearHash(hashKey){
        client.del(JSON.stringify(hashKey));
    }
};