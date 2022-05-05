const { Methods } = require('../config/index');

class Sender {
    static async request(req) {
        const { api } = req.params;
        const path = req.originalUrl.replace(`/${ api }`, '');

        return { api, path };
    }
}

class Router {
    static init(app, port) {
        Methods.forEach(method => {
            app[method.toLowerCase()]('/:api/*', async (req, res) => {
                const response = await Sender.request(req);
    
                res.status(200).json(response);
            });
        });

        app.listen(port, () => {
            console.log(`Proxy server is running on port ${ port }`);
        });
    }
}

module.exports = Router;