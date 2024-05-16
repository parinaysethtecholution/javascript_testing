
function factorialIterative(n) {
  // Factorial is not defined for negative numbers
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  let result = 1;
  // Calculate the factorial using a loop
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

// Calculate the factorial of 5 using the iterative approach
console.log(factorialIterative(5)); // Output: 120


// Recursive factorial function
function factorialRecursive(n) {
  // Factorial is not defined for negative numbers
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Base cases: factorial of 0 or 1 is 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: calculate factorial by multiplying n with the factorial of n-1
  return n * factorialRecursive(n - 1);
}

// Calculate the factorial of 5 using the recursive approach
console.log(factorialRecursive(5)); // Output: 120


// Function to check if a number is prime
function isPrime(n) {
  // Numbers less than or equal to 1 are not prime
  if (n <= 1) {
    return false;
  }

  // Numbers less than or equal to 3 are prime
  if (n <= 3) {
    return true;
  }

  // Check divisibility by 2 and 3
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }

  // Check divisibility by numbers up to the square root of n
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  // If no divisors found, the number is prime
  return true;
}

// Check if 11 and 15 are prime
console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false
