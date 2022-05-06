const cache = {};

const getCache = function(key, max, window) {
    if (!cache[key]) {
        cache[key] = {
            count: max,
            timestamp: Date.now()
        };
    }

    const now = Date.now();
    const diff = now - cache[key].timestamp;
    if (diff > window) {
        cache[key].count = max;
        cache[key].timestamp = now;
    }

    return cache[key];
}

class Limiter {
    constructor() {}

    check(key, window, max) {
        let rta = false;

        const cacheData = getCache(key, max, window);

        if (cacheData.count > 0) {
            cacheData.count--;
            rta = true;
        }

        return rta;
    }
}

module.exports = Limiter;