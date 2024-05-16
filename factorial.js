
function factorialIterative(n) {
  if (n < 0) {
    return "Factorial is not defined for negative numbers"; // Handles negative input
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i; // Iteratively calculates the factorial
  }
  return result;
}

console.log(factorialIterative(5)); // Output: 120

class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null); // Initialize parking slots
    this.availableCount = size; // Keep track of available slots
  }
  parkCar(car) {
    if (this.availableCount === 0) return false; // No available slots
    const emptySlot = this.slots.findIndex(slot => slot === null); // Find first empty slot
    this.slots[emptySlot] = car; // Park the car
    this.availableCount--; // Decrement available slots
    return true; // Parking successful
  }
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car); // Find the car's slot
    if (slotIndex === -1) return false; // Car not found
    this.slots[slotIndex] = null; // Remove the car
    this.availableCount++; // Increment available slots
    return true; // Removal successful
  }
  getAvailableSlots() {
    return this.availableCount; // Get the number of available slots
  }
  isFull() {
    return this.availableCount === 0; // Check if the parking lot is full
  }
}
// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeCar("TRUCK789")); // true
console.log(lot.isFull()); // false

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

