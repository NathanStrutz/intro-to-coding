// Times Tables
let grid = [...Array(13)].map((_,across)=>[...Array(13)].map((_,down)=>across*down))
console.table(grid);
