const Koa = require("koa");
const Keygrip = require("keygrip");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
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
const controller = require("./controller");
app.use(bodyParser());
app.use(controller());
// 兜底函数
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = "text/html";
  ctx.response.body = "<h1>Hello, koa2!</h1>";
});
app.listen(3000, () => {
  console.info("Api 服务启动成功");
});
