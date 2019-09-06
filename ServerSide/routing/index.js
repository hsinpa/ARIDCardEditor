const R_AREDITOR = require('./route_areditor');

module.exports =  (router) => {

  R_AREDITOR(router);

  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'HSINPA'
    };

    await ctx.render('index', {title: ctx.state});
  });
  
}
