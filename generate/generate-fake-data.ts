import { v5 } from "https://deno.land/std@0.142.0/uuid/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";

const people = [];

// gender -- 0: Other, 1: Male, 2: Female

// Date generator
function getRandomDate(from: Date, to: Date) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
}

const generateRandomDOB = (): string => {
    const random = getRandomDate(new Date('1985-02-12T01:57:45.271Z'), new Date('2001-02-12T01:57:45.271Z'))
    return random.toISOString();
}

for (let i = 0 ; i < 1000 ; i++) {
	const d = Date.now() + i
	const data = new TextEncoder().encode(d.toString());

	const p = { 
		id: await v5.generate("8e884ace-bee4-11e4-8dfc-aa07a5b093db", data), 
		name: faker.name.findName(), 
		gender: Math.round(Math.random()) + Math.round(Math.random()),
		distance_miles: Math.round(Math.random()) * 25,
		birth_date: generateRandomDOB(),
		picture_id: "",
		bio: "",
	};

	if (i < 10) {
		p.picture_id = `0${i}`
	} else {
		p.picture_id = `${i}`
	}
	people.push(p);
}

await Deno.mkdir("data").then(s => console.log("directory created")).catch(e => console.log("directory exists"))
await Deno.create("data/data.txt");

try {
	await Deno.writeTextFileSync("data/data.txt", JSON.stringify(people));
	console.log("Written");
} catch (e) {
	console.log(e.message);
}



