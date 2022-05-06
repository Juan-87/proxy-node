const redis = require('redis');

const Cache = require('../../cache');

const cache = Cache.getInstance(); 

const getCache = async (key, max, window) => {
    try {
        let value = await cache.get(key);

        if (!value) {
            value = {
                count: max,
                timestamp: Date.now()
            };

            cache.set(key, JSON.stringify(value));
        } else {
            value = JSON.parse(value);
        }

        const now = Date.now();
        const diff = now - value.timestamp;

        if (diff > window) {
            value.count = max;
            value.timestamp = now;

            cache.set(key, JSON.stringify(value));
        }

        return value;
    } catch (err) {
        throw new Error(err);
    }
}

class Limiter {
    constructor() {}

    async check(key, window, max) {
        let rta = false;

        const cacheData = await getCache(key, max, window);

        if (cacheData.count > 0) {
            cacheData.count--;

            cache.set(key, JSON.stringify(cacheData));

            rta = true;
        }

        return rta;
    }
}

module.exports = Limiter;