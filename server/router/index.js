const { Methods, Apis } = require('../config/index');

const fetch = require('node-fetch');

class Sender {
    static async request(req, method) {
        const { api } = req.params;
        const query = req.originalUrl.replace(`/${ api }`, '');

        let data = null;
        let status = 404;

        try {
            if (typeof Apis[api] != 'undefined') {
                const url = `${ Apis[api].path }${ query }`;

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

class Router {
    static init(app, port) {
        Methods.forEach(method => {
            app[method.toLowerCase()]('/:api/*', async (req, res) => {
                const response = await Sender.request(req, method);
    
                if (response.status != 200) {
                    res.sendStatus(response.status);
                } else {
                    res.status(response.status).json(response.data);
                }
            });
        });

        app.listen(port, () => {
            console.log(`Proxy server is running on port ${ port }`);
        });
    }
}

module.exports = Router;