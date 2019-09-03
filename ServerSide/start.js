const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const rootRouter = require('./routing');

const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');
const env = process.env;

const app = new Koa();

app.use(views(__dirname + '/views', {
  map: {
    html: 'handlebars'
  }
}));

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())

var server = http.Server(app.callback());
// var io = require('./script/socket/main').listen(server);

rootRouter(router);

server.listen(env.NODE_PORT || 3010, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
