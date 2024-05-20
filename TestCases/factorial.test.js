
// factorial.test.js

const { factorialIterative, factorialRecursive, isPrime } = require('./factorial');

describe('Factorial Functions', () => {
  describe('factorialIterative', () => {
    it('should return the factorial of a positive number', () => {
      expect(factorialIterative(5)).toBe(120);
    });

    it('should return an error message for negative numbers', () => {
      expect(factorialIterative(-5)).toBe('Factorial is not defined for negative numbers');
    });
  });

  describe('factorialRecursive', () => {
    it('should return the factorial of a positive number', () => {
      expect(factorialRecursive(5)).toBe(120);
    });

    it('should return an error message for negative numbers', () => {
      expect(factorialRecursive(-5)).toBe('Factorial is not defined for negative numbers');
    });
  });

  describe('isPrime', () => {
    it('should return true for prime numbers', () => {
      expect(isPrime(11)).toBe(true);
    });

    it('should return false for non-prime numbers', () => {
      expect(isPrime(15)).toBe(false);
    });
  });
});
