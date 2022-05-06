const { Apis } = require('../../config');

class Util {
    static apiAndMethod(req) {
        const pathSplited = req.originalUrl.split('/').filter(item => item != '');
        const slug = pathSplited[0];
        const api = Apis[pathSplited[0]];
        const query = pathSplited.splice(1, pathSplited.length).join('/');

        return { api, query, slug };
    }

    static getIP(req) {
        return  req.headers['x-forwarded-for']?.split(',').shift()
                || req.socket?.remoteAddress
    }
}

module.exports = Util;