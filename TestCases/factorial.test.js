
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
