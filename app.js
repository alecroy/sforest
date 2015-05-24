var SForest = require('./sforest');

var sf = new SForest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(sf.toString()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
sf.iter(console.log);
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
