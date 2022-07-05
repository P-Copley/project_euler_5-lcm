const { primesTo1000 } = require('./primes');

// brute force approach
function smallestCommonMultipleBrute(nums) {
  let result = Math.max(...nums);
  for (let i = 0; i < nums.length; i++) {
    if (result % nums[i] !== 0) {
      result++;
      i = 0;
    }
    // account for unsorted inputs
    if (i === nums.length - 1) {
      if (nums.some((num) => result % num !== 0)) i = -1;
    }
  }
  return result;
}

// quick version (warning: contains poorly explained maths)
function smallestCommonMultiplePrimes(nums) {
  // get prime factors of every number
  const primeFactors = nums.map((num) => getPrimeFactors(num));
  // reduce to find most common primes
  return primeFactors.reduce((acc, factors, i) => {
    // take the highest common primes
    for (let prime in factors) {
      if (factors[prime] > acc[prime] || !acc[prime]) {
        acc[prime] = factors[prime];
      }
    }
    // find total product of prime factors on last iteration
    if (i === primeFactors.length - 1) {
      return Object.entries(acc).reduce(
        (total, [prime, exponent]) => total * prime ** exponent,
        1
      );
    }
    return acc;
  }, {});
}

/*
Returns a map of prime factors of a number
e.g. 12 is factored into 2 * 2 * 3
returns { 2: 2, 3: 1 }
*/
function getPrimeFactors(num) {
  const primeFactors = [];
  // limited by list of known primes. Using < 1000 as an example
  const primes = primesTo1000;
  let i = 0;
  while (num > 1 && i < primes.length) {
    if (num % primes[i] === 0) {
      primeFactors.push(primes[i]);
      num = num / primes[i];
      i = 0;
    } else {
      i++;
    }
  }

  return primeFactors.reduce((acc, factor) => {
    acc[factor] = factor in acc ? acc[factor] + 1 : 1;
    return acc;
  }, {});
}

module.exports = { smallestCommonMultipleBrute, smallestCommonMultiplePrimes };
