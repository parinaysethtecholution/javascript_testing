
// Function to calculate factorial iteratively
function factorialIterative(n) {
  // Check if n is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Initialize result to 1
  let result = 1;

  // Iterate from 1 to n and multiply each number to result
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  // Return the final result
  return result;
}

// Function to calculate factorial recursively
function factorialRecursive(n) {
  // Check if n is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Base case: if n is 0 or 1, return 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: multiply n with the factorial of (n - 1)
  return n * factorialRecursive(n - 1);
}

// Test cases
console.log(factorialIterative(5)); // Output: 120
console.log(factorialRecursive(5)); // Output: 120
