const Util = require('../util');
const Cache = require('../../cache');

const fetch = require('node-fetch');

const cache = Cache.getInstance(); 

class Sender {
    static async request(req, method) {
        const { api, query, slug } = Util.apiAndMethod(req);

        let data = null;
        let status = 404;

        try {
            if (typeof api != 'undefined') {
                const url = `${ api.path }/${ query }`;
                const key = `response_api_${ slug }_endpoint_${ query }`;

                let response = null;
                let now;

                if (typeof api.cache != 'undefined') {
                    response = await cache.get(key);
                    now = Date.now();
                }
        
                const diff = (response != null) ? now - JSON.parse(response).timestamp : 0;

                if (typeof api.cache == 'undefined' || response == null || diff > api.cache) {
                    data = await fetch(url, { method });
                    status = data.status;
                    data = await data.json();

                    const timestamp = Date.now();
                    cache.set(key, JSON.stringify({
                        status,
                        data,
                        timestamp
                    }));
                } else {
                    response = JSON.parse(response);
                    data = response.data;
                    status = response.status;
                }
            }
        } catch (err) {
            console.log(err);
            status = 500;
        }

        return { data, status };
    }
}

module.exports = Sender;