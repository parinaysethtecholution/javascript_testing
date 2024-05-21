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


describe('factorialIterative function', () => {
  it('should return the factorial of a positive number', () => {
    expect(factorialIterative(5)).toBe(120);
  });

  it('should return an error message for negative numbers', () => {
    expect(factorialIterative(-5)).toBe('Factorial is not defined for negative numbers');
  });

  it('should return 1 for factorial of 0', () => {
    expect(factorialIterative(0)).toBe(1);
  });
});

describe('factorialRecursive function', () => {
  it('should return the factorial of a positive number', () => {
    expect(factorialRecursive(5)).toBe(120);
  });

  it('should return an error message for negative numbers', () => {
    expect(factorialRecursive(-5)).toBe('Factorial is not defined for negative numbers');
  });

  it('should return 1 for factorial of 0', () => {
    expect(factorialRecursive(0)).toBe(1);
  });
});
