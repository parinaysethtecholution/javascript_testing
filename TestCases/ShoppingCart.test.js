
// mathFunctions.test.js

const { add, subtract, multiply, divide } = require('./mathFunctions');

// Test cases for the add function
describe('add function', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should handle negative numbers correctly', () => {
    expect(add(-1, 2)).toBe(1);
  });

  it('should return zero when adding zero to a number', () => {
    expect(add(0, 5)).toBe(5);
  });
});

// Test cases for the subtract function
describe('subtract function', () => {
  it('should subtract two numbers correctly', () => {
    expect(subtract(3, 2)).toBe(1);
  });

  it('should handle negative results correctly', () => {
    expect(subtract(2, 3)).toBe(-1);
  });
});

// Test cases for the multiply function
describe('multiply function', () => {
  it('should multiply two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  it('should return zero when multiplying by zero', () => {
    expect(multiply(5, 0)).toBe(0);
  });
});

// Test cases for the divide function
describe('divide function', () => {
  it('should divide two numbers correctly', () => {
    expect(divide(6, 2)).toBe(3);
  });
  it('should throw an error when dividing by zero', () => {
    expect(() => {
      divide(6, 0);
    }).toThrow('Division by zero');
  });
}
