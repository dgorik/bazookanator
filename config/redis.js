const redis = require('redis');
const client = redis.createClient();

const connectRedis = async () => {
    try {
         client.on('connect', () => {
            console.log('Redis Connection Established')
         })
         client.on('connect', (err) => {
            console.log('Redis Connection Failed', err)
         })
         await client.connect();
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1);
    }
};

module.exports = { client, connectRedis }

