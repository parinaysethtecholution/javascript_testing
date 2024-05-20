
// Function to calculate the factorial of a number using an iterative approach
function factorialIterative(n) {
  // Check if the input is negative, and return an error message if it is
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

// Function to calculate the factorial of a number using a recursive approach
function factorialRecursive(n) {
  // Check if the input is negative, and return an error message if it is
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

// Function to check if a number is prime
function isPrime(n) {
  // Check if the input is less than or equal to 1, return false
  if (n <= 1) {
    return false;
  }

  // Check if the input is 2 or 3, return true
  if (n <= 3) {
    return true;
  }

  // Check if the input is divisible by 2 or 3, return false
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }

  // Check for divisibility by numbers of the form 6k +/- 1
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  // If no divisor is found, the number is prime
  return true;
}

// Test cases
console.log(factorialIterative(5)); // Output: 120
console.log(factorialRecursive(5)); // Output: 120
console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false
