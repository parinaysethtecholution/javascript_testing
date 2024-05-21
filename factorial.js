
// Function to calculate factorial using an iterative approach
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

  // Return the final result
  return result;
}

// Function to calculate factorial using a recursive approach
function factorialRecursive(n) {
  // Check if the input is negative
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

// Test the iterative factorial function
console.log(factorialIterative(5)); // Output: 120

// Test the recursive factorial function
console.log(factorialRecursive(5)); // Output: 120
