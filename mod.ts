import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

router
	.get("/", (ctx) => {
		ctx.response.body = 'Welcome';
})
	.get("/:id", (ctx) => {
		ctx.response.body = `hello ${ctx.params.id}, welcome this world`
	})

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });