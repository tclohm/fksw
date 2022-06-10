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