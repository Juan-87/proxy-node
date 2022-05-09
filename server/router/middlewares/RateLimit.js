const Util = require('../util');
const Limiter = require('../util/limiter');
const { ValidationsTypes } = require('../../config');

const limiter = new Limiter();

const checkValidation = async (api, key, type, res, next) => {
    if (typeof api != 'undefined') {
        if (typeof api.rate_limit != 'undefined') {
            const config = api.rate_limit[type];

            let checkRateLimit = true;
            if (typeof config != 'undefined') {
                checkRateLimit = await limiter.check(key, config.window, config.max);
            }

            if (!checkRateLimit) {
                res.sendStatus(429);
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        res.sendStatus(404);
    }
}

const RateLimit = {
    apiValidation: async function(req, res, next) {
        const { api, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }`;

        checkValidation(api, key, ValidationsTypes.API, res, next);
    }, 

    apiEndpointValidation: function(req, res, next) {
        const { api, query, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }_endpoint_${ query.split('/').join('_') }`;

        checkValidation(api, key, ValidationsTypes.ENDPOINT, res, next);
    }, 

    apiIpValidation: function(req, res, next) {
        const { api, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }_ip_${ Util.getIP(req) }`;

        checkValidation(api, key, ValidationsTypes.IP, res, next);
    }, 

    apiIpEndpointValidation: function(req, res, next) {
        const { api, query, slug } = Util.apiAndMethod(req);
        const key = `api_${ slug }_ip_${ Util.getIP(req) }_endpoint_${ query.split('/').join('_') }`;

        checkValidation(api, key, ValidationsTypes.IP_ENDPOINT, res, next);
    }
}

module.exports = RateLimit;