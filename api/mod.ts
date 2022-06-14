import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std@0.143.0/path/mod.ts";
import { BufReader } from "https://deno.land/std@0.143.0/io/mod.ts";

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

app.use(async (ctx, next) => {
  ctx.response.type = 'json'
  await next()
})

router
	.get("/", (ctx) => {
    //const filename = path.join(Deno.cwd(), "/data/faces/face-00.jpeg");
		const filename = path.join(Deno.cwd(), "/data/data.json");
    const data = JSON.parse(await Deno.readTextFile(filename));
    ctx.response.body = { data }
})
	.get("/:id", async (ctx) => {
     // ctx.params.id
     ctx.response.body = { params: ctx.params.id }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

app.addEventListener("error", (event) => {
  console.log(event.error);
});

await app.listen({ port: 8000 });