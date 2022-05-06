const { Apis } = require('../../config');
const Util = require('../util');
const Limiter = require('../util/limiter');

const limiter = new Limiter();

const RateLimit = function(req, res, next) {
    const { api, query, slug } = Util.apiAndMethod(req);

    const keyApi = `api_${ slug }`;
    const keyApiEndpoint = `api_${ slug }_endpoint_${ query.split('/').join('_') }`;
    const keyApiIP = `api_${ slug }_ip_${ Util.getIP(req) }`;
    const keyApiIPEndpoint = `api_${ slug }_ip_${ Util.getIP(req) }_endpoint_${ query.split('/').join('_') }`;

    if (!limiter.check(keyApi, api.rate_limit.api.window, api.rate_limit.api.max)) {
        res.sendStatus(429);
    } else if (!limiter.check(keyApiEndpoint, api.rate_limit.endpoint.window, api.rate_limit.endpoint.max)) {
        res.sendStatus(429);
    } else if (!limiter.check(keyApiIP, api.rate_limit.ip.window, api.rate_limit.ip.max)) {
        res.sendStatus(429);
    } else if (!limiter.check(keyApiIPEndpoint, api.rate_limit.ipEndpoint.window, api.rate_limit.ipEndpoint.max)) {
        res.sendStatus(429);
    } else {
        next();
    }
}

module.exports = RateLimit;