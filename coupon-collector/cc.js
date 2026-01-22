let cl = console.log;
let runResults = [];

for (let run = 0; run < 100000; run++) {
  let targetCoupons = 1000;
  let found = new Set();
  let opened = 0;
  let getNextLoot = function () {
    return Math.ceil(Math.random() * targetCoupons);
  };
  // let getStats = function () {
  //   return `${found.size} of ${lootBoxes} found: ${Math.round((found.size / lootBoxes) * 100)}%`;
  // };

  while (found.size < targetCoupons) {
    opened++;
    let nextLoot = getNextLoot();

    if (found.has(nextLoot)) {
      // cl(`Attempt #${i}. We've already found ${nextCoupon}. ${getStats()}`);
    } else {
      found.add(nextLoot);
      // cl(`Attempt #${i}. Adding ${nextCoupon} for the first time. ${getStats()}`);
    }
  }

  runResults.push(opened);
}

cl(`Average attempts from ${runResults.length} runs:`, runResults.reduce((agg, cur) => agg + cur, 0) / runResults.length);
cl(
  "Fastest:",
  runResults.reduce((best, cur) => (best > cur ? cur : best), 9999999),
);
cl(
  "Slowest:",
  runResults.reduce((best, cur) => (best < cur ? cur : best), 0),
);
