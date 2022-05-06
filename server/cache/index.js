const redis = require('redis');

class CacheSingleton {
    constructor() {
        this.client = redis.createClient({
            legacyMode: true,
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });

        this.client.on('error', (err) => console.log('Redis Client Error', err));

        this.client.connect();

        process.on('SIGTERM', () => {
            this.client.end();
        });
    }

    async set(key, value) {
        this.client.set(key, value);
    }

    async get(key) {
        return new Promise((res, rej) => {
            try {
                this.client.get(key, (err, value) => {
                    if (err) {
                        rej(err);
                    }

                    res(value);
                });
            } catch (err) {
                rej(err);
            }
        });
    }

    flush() {
        this.client.flushdb();
    }
}

class Cache {
    constructor() {
        throw new Error('Use Cache.getInstance()');
    }

    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new CacheSingleton();
        }

        return Cache.instance;
    }
}

module.exports = Cache;