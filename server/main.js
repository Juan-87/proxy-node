const Router = require('./router');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const router = new Router(app);

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});