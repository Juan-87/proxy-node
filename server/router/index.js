class Router {
    constructor(app) {
        this.app = app;

        this.init();
    }

    init() {
        this.app.get('/:cli/*', (req, res) => {
            const api = req.params.cli;
            const path = req.originalUrl.replace(`/${ req.params.cli }`, '');

            res.status(200).json({ api, path });
        });
    }
}

module.exports = Router;