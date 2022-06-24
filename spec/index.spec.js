const { expect } = require('chai');
const { smallestCommonMultipleBrute } = require('../index');
const { PerformanceObserver, performance } = require('perf_hooks');
// https://nodejs.org/api/perf_hooks.html#performance-measurement-apis

describe('smallestCommonMultiple', () => {
  it('returns the single number from a set of one', () => {
    const testSet = [1];
    expect(smallestCommonMultipleBrute(testSet)).to.equal(1);
  });
  it('returns the first scm >1 from natural numbers', () => {
    const testSet = [1, 2, 3];
    expect(smallestCommonMultipleBrute(testSet)).to.equal(6);
  });
  it('returns the example case of 1 - 10', () => {
    const testSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(smallestCommonMultipleBrute(testSet)).to.equal(2520);
  });
  it('solves 1 - 20', () => {
    const start = performance.mark('start');
    const testSet = Array.from({ length: 20 }, (_, i) => i + 1);
    const end = performance.mark('end');
    expect(smallestCommonMultipleBrute(testSet)).to.equal(232792560);
    // 1319ms on lecture mac
    console.log(performance.measure('start to end', 'start'));
  });
});
