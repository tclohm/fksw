import { readerFromStreamReader } from "https://deno.land/std/io/mod.ts";

async function f(url: string, iteration: number) {
	const result = await fetch(url)
	const wrdr = result?.body?.getReader()
	if (wrdr) {
		const reader = readerFromStreamReader(wrdr);
		let file;
		if (iteration < 10) {
			file = await Deno.open(`data/faces/face-0${iteration}.jpeg`, { create: true, write: true });
		} else {
			file = await Deno.open(`data/faces/face-${iteration}.jpeg`, { create: true, write: true });
		}
		await Deno.copy(reader, file)
		file.close()
	}
}

Deno.mkdir("data/faces").then(s => console.log("directory created")).catch(e => console.log("directory exists"))

for (let i = 0 ; i < 1000 ; i++) {
	await f("https://thispersondoesnotexist.com/image", i);
}