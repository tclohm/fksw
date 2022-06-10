# FakeDev -- API with fake data

## File Structure
- data/
	- data.txt -- array with 1000 objects
		
		`object : { 
			id: 	string,
			name: 	string,
			gender: number,
		}`

	- faces/
		- face-#.ts ... 1000
- generate/
	- generate-fake-data.ts
	- generate-fake-faces.ts

### Generate Fake data
#### IMPORTANT: Please run commands at the root of project
- Deno run --allow-write --allow-read generate-fake-data.ts
- Deno run --allow-write --allow-net generate-fake-faces.ts

#### generate-fake-faces file 
- does a GET request from `https://thispersondoesnotexist.com/image`
- creaes a file and streams the jpeg data into the file

#### generate-fake-data file
- uses faker.js