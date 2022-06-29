const { expect } = require('chai');
const fs = require('fs/promises');
const {
  smallestCommonMultipleBrute,
  smallestCommonMultiplePrimes,
} = require('../index');
const { PerformanceObserver, performance } = require('perf_hooks');
// https://nodejs.org/api/perf_hooks.html#performance-measurement-apis

runTests(smallestCommonMultipleBrute, 'smallestCommonMultipleBrute');
runTests(smallestCommonMultiplePrimes, 'smallestCommonMultiplePrimes');

function runTests(smallestCommonMultiple, funcName) {
  describe(funcName, () => {
    let timings = [];
    beforeEach(() => {
      performance.clearMarks();
      performance.mark('test-start');
    });
    afterEach(() => {
      performance.mark('test-end');
      timings.push(
        performance.measure('test run', 'test-start', 'test-end').duration
      );
    });

    after(async () => {
      // console.log(timings);
      await fs.appendFile(
        'timings.txt',
        `${funcName}\n\n${JSON.stringify(timings, null, 2)}\n\n`
      );
    });
    it('returns the single number from a set of one', () => {
      const testSet = [1];
      expect(smallestCommonMultiple(testSet)).to.equal(1);
    });
    it('returns the scm >1 from natural numbers', () => {
      const testSet = [2, 3];
      expect(smallestCommonMultiple(testSet)).to.equal(6);
    });
    it('returns the scm of 2 prime numbers', () => {
      const testSet = [3, 5];
      expect(smallestCommonMultiple(testSet)).to.equal(15);
    });
    it('returns the scm of 2 non-prime numbers', () => {
      const testSet = [4, 6];
      expect(smallestCommonMultiple(testSet)).to.equal(12);
    });
    it('returns the scm of unsorted numbers', () => {
      const testSet = [5, 3];
      expect(smallestCommonMultiple(testSet)).to.equal(15);
    });
    it('returns the example case of 1 - 10', () => {
      const testSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(smallestCommonMultiple(testSet)).to.equal(2520);
    });
    it('solves 1 - 20', () => {
      const testSet = Array.from({ length: 20 }, (_, i) => i + 1);
      expect(smallestCommonMultiple(testSet)).to.equal(232792560);
    }).timeout(10000);
    it('solves 1 - 21', () => {
      const testSet = Array.from({ length: 21 }, (_, i) => i + 1);
      expect(smallestCommonMultiple(testSet)).to.equal(232792560);
    }).timeout(10000);
    it('solves large(ish) numbers', () => {
      const testSet = [801, 970, 12345];
      expect(smallestCommonMultiple(testSet)).to.equal(639446310);
    }).timeout(10000);
  });
}
