const Util = require('../util');

const fetch = require('node-fetch');

class Sender {
    static async request(req, method) {
        const { api, query } = Util.apiAndMethod(req);

        let data = null;
        let status = 404;

        try {
            if (typeof api != 'undefined') {
                const url = `${ api.path }/${ query }`;

                data = await fetch(url, { method });
                status = data.status;
                data = await data.json();
            }
        } catch (err) {
            status = 500;
        }

        return { data, status };
    }
}

module.exports = Sender;