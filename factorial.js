/**
 * Calculates the factorial of a non-negative integer using an iterative approach.
 * @param {number} n - A non-negative integer whose factorial is to be calculated.
 * @returns {(number|string)} The factorial of the given number or an error message for negative inputs.
 */
function factorialIterative(n) {
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(5));

/**
 * Calculates the factorial of a non-negative integer using a recursive approach.
 * @param {number} n - A non-negative integer whose factorial is to be calculated.
 * @returns {(number|string)} The factorial of the given number or an error message for negative inputs.
 */
function factorialRecursive(n) {
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5));