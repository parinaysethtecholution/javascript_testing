
function factorialIterative(n) {
    // Check if n is negative
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    let result = 1;
    // Iterate from 1 to n and multiply the result
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(5)); // Output: 120


function factorialRecursive(n) {
    // Check if n is negative
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    // Base case: factorial of 0 or 1 is 1
    if (n === 0 || n === 1) {
        return 1;
    }
    // Recursive case: n! = n * (n-1)!
    return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120


function isPrime(n) {
    // Check if n is less than 2 (not a prime number)
    if (n < 2) {
        return false;
    }
    // Check if n is divisible by any number from 2 to the square root of n
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    // If n is not divisible by any number, it is a prime number
    return true;
}

let num = parseInt(prompt("Enter a number: "));
if (isPrime(num)) {
    console.log(num + " is a prime number");
} else {
    console.log(num + " is not a prime number");
}
