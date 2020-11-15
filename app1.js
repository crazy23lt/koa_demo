const { Stats } = require("fs");
const koa = require("koa");
const app = new koa();
const Router = require("koa-router");
const router = new Router;
const serve = require("koa-static");
const path = require("path");
const staticPath = path.resolve(__dirname, "static");
const staticServe = serve(staticPath, {
    setHeaders: (res, path, Stats) => {
        if (path.indexOf("jpg") > -1) {
            res.setHeader("Cache-Control", ["private", "max-age=60"]);
        }
    }
});
app.use(staticServe);
router.get("/ajax", async (ctx, next) => {
    console.info("get request", ctx.request.header.referer);
    ctx.body = "received";
});
app.use(router.routes());
app.listen(3100, () => {
    console.info('app1 started at port 3100...');
});