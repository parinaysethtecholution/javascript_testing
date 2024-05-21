
describe('factorialIterative function', () => {
  it('should calculate the factorial of a positive number correctly', () => {
    expect(factorialIterative(5)).toBe(120);
  });

  it('should return an error message for negative numbers', () => {
    expect(factorialIterative(-5)).toBe('Factorial is not defined for negative numbers');
  });
});

describe('factorialRecursive function', () => {
  it('should calculate the factorial of a positive number correctly', () => {
    expect(factorialRecursive(5)).toBe(120);
  });

  it('should return an error message for negative numbers', () => {
    expect(factorialRecursive(-5)).toBe('Factorial is not defined for negative numbers');
  });

  it('should return 1 for 0 and 1', () => {
    expect(factorialRecursive(0)).toBe(1);
    expect(factorialRecursive(1)).toBe(1);
  });
});
