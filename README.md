# Logic Blocks - Project Euler 5

[The problem](https://projecteuler.net/problem=5)

This is a problem about finding lowest common multiples from a list of numbers.
There are 2 implementations:

## smallestCommonMultipleBrute

Uses brute force to increment a number and check if every number in the list is divisible. THe number continually increments until a satisfactory number is met

## smallestCommonMultiplePrimes

This approach uses Prime factorization to find the prime factors for each number in the list.
The lcm(lowest common multiple) is then calculated by working out the product of the each prime factor raised the power of it's most common occurrence.

e.g.[12, 20]
12 = 2 x 2 x 3 // {2: 2, 3: 1}
20 = 2 x 2 x 5 // {2: 2, 5: 1}

lcm = 2^2 x 3^1 x 5^1 -> 60
