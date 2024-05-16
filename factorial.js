
function factorialIterative(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(5)); // Output: 120


function factorialRecursive(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120


// The 'Changed Part' of the code is the 'isPrime' function, which has been refactored for improved readability and efficiency.
function isPrime(n) {
    // Check if the number is less than or equal to 1, as these are not prime numbers
    if (n <= 1) {
        return false;
    }
    // Check if the number is 2 or 3, as these are prime numbers
    if (n <= 3) {
        return true;
    }
    // Check if the number is divisible by 2 or 3, as these are not prime numbers
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
    // Check for all numbers from 5 to the square root of the number, incrementing by 6
    // as all prime numbers greater than 3 can be expressed in the form 6k ± 1
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    // If the number has passed all the checks, it is a prime number
    return true;
}

console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false
