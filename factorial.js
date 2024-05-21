
// Function to calculate factorial iteratively
function calculateFactorialIterative(n) {
  // Check if the input is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Initialize the result with 1
  let result = 1;

  // Iterate from 1 to n and calculate the factorial
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  // Return the calculated factorial
  return result;
}

// Function to calculate factorial recursively
function calculateFactorialRecursive(n) {
  // Check if the input is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Base case: If n is 0 or 1, return 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: Calculate the factorial by multiplying n with the factorial of (n - 1)
  return n * calculateFactorialRecursive(n - 1);
}

// Test the iterative factorial function
console.log(calculateFactorialIterative(5)); // Output: 120

// Test the recursive factorial function
console.log(calculateFactorialRecursive(5)); // Output: 120
