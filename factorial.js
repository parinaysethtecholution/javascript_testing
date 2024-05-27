
/**
 * Calculates the factorial of a given number using an iterative approach.
 *
 * @param {number} n - The number for which the factorial needs to be calculated.
 * @returns {number|string} The factorial of the given number, or an error message if the input is negative.
 */
function factorialIterative(n) {
    // Check if the input is negative, and return an error message if it is
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }

    // Initialize the result variable with 1
    let result = 1;

    // Iterate from 1 to n, multiplying the current value of i with the result
    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    // Return the final result
    return result;
}

/**
 * Calculates the factorial of a given number using a recursive approach.
 *
 * @param {number} n - The number for which the factorial needs to be calculated.
 * @returns {number|string} The factorial of the given number, or an error message if the input is negative.
 */
function factorialRecursive(n) {
    // Check if the input is negative, and return an error message if it is
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }

    // Base cases: if n is 0 or 1, return 1
    if (n === 0 || n === 1) {
        return 1;
    }

    // Recursive case: multiply n with the factorial of (n - 1)
    return n * factorialRecursive(n - 1);
}

// Test cases
console.log(factorialIterative(5)); // Output: 120
console.log(factorialRecursive(5)); // Output: 120
