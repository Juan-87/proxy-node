const Router = require('./router');

const os = require('os');
const cluster = require('cluster');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const threads = os.cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < threads; i++) {
        cluster.fork();
    }
} else {
    Router.init(app, port);
}

cluster.on('exit', function() {
    cluster.fork();
});