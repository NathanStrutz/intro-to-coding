let cl = console.log;
let runResults = [];

for (let index = 0; index < 100000; index++) {
  let lootBoxes = 25;
  let found = new Set();
  let i = 0;
  let getNextLoot = function () {
    return Math.ceil(Math.random() * lootBoxes);
  };
  // let getStats = function () {
  //   return `${found.size} of ${lootBoxes} found: ${Math.round((found.size / lootBoxes) * 100)}%`;
  // };

  while (found.size < lootBoxes) {
    i++;
    let nextLoot = getNextLoot();

    if (found.has(nextLoot)) {
      // cl(`Attempt #${i}. We've already found ${nextCoupon}. ${getStats()}`);
    } else {
      found.add(nextLoot);
      // cl(`Attempt #${i}. Adding ${nextCoupon} for the first time. ${getStats()}`);
    }
  }

  runResults.push(i);
  // cl("Attempts:", i);
}

cl(`Average attempts from ${runResults.length} runs:`, runResults.reduce((agg, cur) => agg + cur, 0) / runResults.length);
cl(
  "Fastest:",
  runResults.reduce((best, cur) => (best > cur ? cur : best), 9999999)
);
cl(
  "Slowest:",
  runResults.reduce((best, cur) => (best < cur ? cur : best), 0)
);
