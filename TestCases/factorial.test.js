
// factorial.test.js

describe('Factorial Functions', () => {
  describe('factorialIterative', () => {
    it('should return the factorial of a positive number', () => {
      expect(factorialIterative(5)).toBe(120);
    });

    it('should return an error message for negative numbers', () => {
      expect(factorialIterative(-3)).toBe('Factorial is not defined for negative numbers');
    });

    it('should return 1 for 0 and 1', () => {
      expect(factorialIterative(0)).toBe(1);
      expect(factorialIterative(1)).toBe(1);
    });
  });

  describe('factorialRecursive', () => {
    it('should return the factorial of a positive number', () => {
      expect(factorialRecursive(5)).toBe(120);
    });

    it('should return an error message for negative numbers', () => {
      expect(factorialRecursive(-3)).toBe('Factorial is not defined for negative numbers');
    });

    it('should return 1 for 0 and 1', () => {
      expect(factorialRecursive(0)).toBe(1);
      expect(factorialRecursive(1)).toBe(1);
    });
  });
});
