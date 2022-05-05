const { Methods, Apis } = require('../config/index');

class Sender {
    static async request(req, method) {
        const { api } = req.params;
        const path = req.originalUrl.replace(`/${ api }`, '');

        return { api, path, method, api: Apis[api] };
    }
}

class Router {
    static init(app, port) {
        Methods.forEach(method => {
            app[method.toLowerCase()]('/:api/*', async (req, res) => {
                const response = await Sender.request(req, method);
    
                res.status(200).json(response);
            });
        });

        app.listen(port, () => {
            console.log(`Proxy server is running on port ${ port }`);
        });
    }
}

module.exports = Router;