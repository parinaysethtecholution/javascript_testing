/**
 * Computes the factorial of a non-negative integer using iteration.
 * Factorial is the product of all positive integers less than or equal to n.
 * For example, the factorial of 5 (5!) is 5 x 4 x 3 x 2 x 1 = 120.
 * 
 * @param {number} n - A non-negative integer whose factorial is to be computed.
 * @returns {number|string} The factorial of `n` if `n` is non-negative, otherwise an error message.
 * @throws {Error} Throws an error if the input is not a non-negative integer.
 */
function factorialIterative(n) {
  if (typeof n !== 'number' || n % 1 !== 0) {
    throw new Error('Input must be a non-negative integer.');
  }

  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

/**
 * Computes the factorial of a non-negative integer using recursion.
 * This function calls itself with decremented values of `n` until it reaches the base case.
 * The recursion unwinds with the multiplication of returned values, giving the factorial.
 * 
 * @param {number} n - A non-negative integer whose factorial is to be computed.
 * @returns {number|string} The factorial of `n` if `n` is non-negative, otherwise an error message.
 * @throws {Error} Throws an error if the input is not a non-negative integer.
 */
function factorialRecursive(n) {
  if (typeof n !== 'number' || n % 1 !== 0) {
    throw new Error('Input must be a non-negative integer.');
  }

  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorialRecursive(n - 1);
}

// Example usage
console.log(factorialRecursive(5)); // Output: 120