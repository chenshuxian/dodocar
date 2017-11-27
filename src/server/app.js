/* Server Packages */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const rest = require('./rest');
/* Client Packages */
import webpack from 'webpack';
import React from 'react';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable, { fromJS } from 'immutable';
/* Common Packages */
import webpackConfig from '../../webpack.config';
import configureStore from '../common/store/configureStore';

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// Use this middleware to set up hot module reloading via webpack.
// if (process.env.NODE_ENV !== 'test') {
//     const compiler = webpack(webpackConfig);
//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
//     app.use(webpackHotMiddleware(compiler));
// }

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
