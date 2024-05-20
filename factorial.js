
/**
 * Calculates the factorial of a given non-negative integer using an iterative approach.
 *
 * @param {number} n - The non-negative integer for which the factorial needs to be calculated.
 * @returns {number|string} - The factorial of the given number, or an error message if the input is negative.
 */
function factorialIterative(n) {
  // Check if the input is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Initialize the result with 1
  let result = 1;

  // Iterate from 1 to n and multiply each number to the result
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

/**
 * Calculates the factorial of a given non-negative integer using a recursive approach.
 *
 * @param {number} n - The non-negative integer for which the factorial needs to be calculated.
 * @returns {number|string} - The factorial of the given number, or an error message if the input is negative.
 */
function factorialRecursive(n) {
  // Check if the input is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Base case: If n is 0 or 1, return 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: Calculate the factorial by multiplying n with the factorial of (n - 1)
  return n * factorialRecursive(n - 1);
}

// Example usage
console.log(factorialRecursive(5)); // Output: 120
