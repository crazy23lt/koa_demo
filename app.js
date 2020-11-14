const Koa = require("koa");
const Keygrip = require("keygrip");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const app = new Koa();
// 设置签名的 Cookie 密钥。
app.keys = new Keygrip(["im a newer secret", "i like turtle"], "sha256");
// 日志
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.info(`${ctx.method} ${ctx.url} - ${rt}`);
});
// 响应时间
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
// 响应
router.get("/hello/:name", async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.get("/", async (ctx, next) => {
  ctx.response.body = "<h1>Index</h1>";
});
router.post("/signin",async (ctx,next)=>{

});
app.use(router.routes());
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = "text/html";
  ctx.response.body = "<h1>Hello, koa2!</h1>";
});
app.listen(3000, () => {
  console.info("Api 服务启动成功");
});
