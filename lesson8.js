// Times Tables
{
	// #1 - loops in loops
	let grid = [];
	for (let across=0; across<=12; across++) {
		grid[across] = [];

		for (let down=0; down<=12; down++) {
			grid[across][down] = across * down;
		}
	}
	console.table(grid);
}

{
	// #2 - one-liner
	let grid = [...Array(13)].map((_,across)=>[...Array(13)].map((_,down)=>across*down))
	console.table(grid);
}

