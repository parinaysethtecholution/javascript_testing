
// Function to calculate factorial using an iterative approach
function calculateFactorialIterative(n) {
  // Check if the input number is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Initialize the result with 1
  let result = 1;

  // Iterate from 1 to n and multiply each number to the result
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  // Return the calculated factorial
  return result;
}

// Log the factorial of 5 using the iterative approach
console.log(calculateFactorialIterative(5)); // Output: 120

// Function to calculate factorial using a recursive approach
function calculateFactorialRecursive(n) {
  // Check if the input number is negative
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Base cases: 0! = 1 and 1! = 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: n! = n * (n-1)!
  return n * calculateFactorialRecursive(n - 1);
}

// Log the factorial of 5 using the recursive approach
console.log(calculateFactorialRecursive(5)); // Output: 120

// Function to check if a number is prime
function isPrime(n) {
  // Check if the number is less than or equal to 1 (not prime)
  if (n <= 1) {
    return false;
  }

  // Check if the number is 2 or 3 (prime)
  if (n <= 3) {
    return true;
  }

  // Check if the number is divisible by 2 or 3 (not prime)
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }

  // Check for divisibility by numbers up to the square root of n
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  // If no divisor is found, the number is prime
  return true;
}

// Log the result of isPrime for 11 and 15
console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false
