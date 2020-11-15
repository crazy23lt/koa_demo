const koa = require("koa");
const app = new koa();
const Router = require("koa-router");
const router = new Router();
router.get("/ajax", async (ctx, next) => {
    console.info("get request", ctx.request.header.referer);
    ctx.body = "received";
});
router.get("/jsonp", async (ctx, next) => {
    const req = ctx.request.query;
    console.info(req);
    const data = {
        data: req.type
    };
    ctx.body = `${req.callback}(${JSON.stringify(data)})`;
});
app.use(router.routes());
app.listen(3200, () => {
    console.info("app2 server is listening port 3200");
});