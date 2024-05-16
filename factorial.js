
// Function to calculate factorial using an iterative approach
function factorialIterative(n) {
  // Check if n is negative, and return an error message if it is
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Initialize the result with 1
  let result = 1;

  // Iterate from 1 to n, multiplying each number to the result
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  // Return the final result
  return result;
}

// Log the factorial of 5 using the iterative approach
console.log(factorialIterative(5)); // Output: 120

// Function to calculate factorial using a recursive approach
function factorialRecursive(n) {
  // Check if n is negative, and return an error message if it is
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

// Log the factorial of 5 using the recursive approach
console.log(factorialRecursive(5)); // Output: 120
