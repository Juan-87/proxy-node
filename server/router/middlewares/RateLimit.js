const Util = require('../util');
const Limiter = require('../util/limiter');

const limiter = new Limiter();

const RateLimit = {
    apiValidation: async function(req, res, next) {
        const { api, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }`;
        const config = api.rate_limit.api;

        const checkRateLimit = await limiter.check(key, config.window, config.max);

        if (typeof config != 'undefined' && !checkRateLimit) {
            res.sendStatus(429);
        } else {
            next();
        }
    }, 

    apiEndpointValidation: function(req, res, next) {
        const { api, query, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }_endpoint_${ query.split('/').join('_') }`;
        const config = api.rate_limit.endpoint;

        if (typeof config != 'undefined' && !limiter.check(key, config.window, config.max)) {
            res.sendStatus(429);
        } else {
            next();
        }
    }, 

    apiIpValidation: function(req, res, next) {
        const { api, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }_ip_${ Util.getIP(req) }`;
        const config = api.rate_limit.ip;

        if (typeof config != 'undefined' && !limiter.check(key, config.window, config.max)) {
            res.sendStatus(429);
        } else {
            next();
        }
    }, 

    apiIpEndpointValidation: function(req, res, next) {
        const { api, query, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }_ip_${ Util.getIP(req) }_endpoint_${ query.split('/').join('_') }`;
        const config = api.rate_limit.ipEndpoint;

        if (typeof config != 'undefined' && !limiter.check(key, config.window, config.max)) {
            res.sendStatus(429);
        } else {
            next();
        }
    }
}

module.exports = RateLimit;