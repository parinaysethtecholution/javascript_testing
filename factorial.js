
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

// Example usage
console.log(factorialIterative(5)); // Output: 120

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

    // Base cases: 0! = 1 and 1! = 1
    if (n === 0 || n === 1) {
        return 1;
    }

    // Recursive case: n! = n * (n-1)!
    return n * factorialRecursive(n - 1);
}

// Example usage
console.log(factorialRecursive(5)); // Output: 120

/**
 * Checks if a given number is prime or not.
 *
 * @param {number} n - The number to be checked for primality.
 * @returns {boolean} - True if the number is prime, false otherwise.
 */
function isPrime(n) {
    // Negative numbers, 0, and 1 are not prime
    if (n <= 1) return false;

    // 2 and 3 are prime
    if (n <= 3) return true;

    // Check if the number is divisible by 2 or 3
    if (n % 2 === 0 || n % 3 === 0) return false;

    // Check for divisibility by numbers of the form 6k +/- 1
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    // If no divisor is found, the number is prime
    return true;
}
