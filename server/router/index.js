const { Methods } = require('../config/index');
const Sender = require('./sender');
const RateLimit = require('./middlewares/RateLimit');

class Router {
    static init(app, port) {
        app.use(RateLimit);

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