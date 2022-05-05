const Router = require('./router');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

Router.init(app, port);